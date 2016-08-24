/* loop-webaudio-node.js
   nick merrill / http://cosmopol.is
   berkeley 2016

takes audio context, and url to some audio, as well as a time (in ms) to fade in/out audio

  looper(AudioNode, 500)

returns an object with two methods

- start()
- stop()
- .on('fading-in', ...)
- .on('done-fading-in', ...)
- .on('fading-out', null ...)
- .on('done-fading-out', ...)
- .on('error', err => {})
- .on('loop-progress', percent => ...) 

   percent is a value 0-1

*/
const EE = require('events').EventEmitter

function sourceToGain (buff, audioContext) {
  // a source enode
  let sourceNode = audioContext.createBufferSource();
  sourceNode.buffer = buff;
  sourceNode.loop = true;
  // a gain node
  let gainNode = audioContext.createGain();
  gainNode.gain.value = 0.0;
  // wire them up
  sourceNode.connect(gainNode);
  gainNode.connect(audioContext.destination);
  // return a looping source node
  // and a gain node,
  // wired to each other
  return {
    sourceNode: sourceNode,
    gainNode: gainNode
  }
}

module.exports = function (buff, ctx, fade=300, progressPoll=100) {

  let emitter = new EE()
  let duration = buff.duration
  let startTime = null
  let progressInterval = null
  let loopProgress = null
  let { sourceNode , gainNode } = sourceToGain(buff, ctx)

  function emitGain () {
    let gain = gainNode.gain
    var gainPercent = gain.value 
    emitter.emit('gain', gainPercent)
  }

  function emitGainDuringFade () {
    let itrvl = setInterval(emitGain, progressPoll)
    setTimeout(() => clearInterval(itrvl), fade+progressPoll)
    return
  }

  function fadeGainNode (value, seconds) {
    var gain = gainNode.gain
    var future = ctx.currentTime + seconds
    // Setting a scheduled parameter value
    // TODO why?
    // https://alemangui.github.io/blog//2015/12/26/ramp-to-value.html
    gain.setValueAtTime(gain.value, ctx.currentTime)  
    // TODO exponential ramp? just note we can't set value to 0 bc math
    gain.linearRampToValueAtTime(value, future);
    return
  }

  function getLoopProgress () {
    let modSecs = (ctx.currentTime - startTime) % duration
    let percent = modSecs / duration
    return percent
  }

  function start () {
    // set startTime (for checking progress)
    startTime = ctx.currentTime
    // set an interval to check progress
    progressInterval = setInterval(() => {
      emitter.emit('loop-progress', getLoopProgress())
    }, progressPoll)
    // emit 'gain' events throughout the fade
    emitGainDuringFade()
    // set up gain node's fade in (in seconds)
    fadeGainNode(1.0,fade/1000)
    // start looping source node
    sourceNode.start(0);
    // emit 'fading in'
    emitter.emit('fading-in')
    // set timeout to emit 'faded-in' after fade
    setTimeout(function () {
      emitter.emit('done-fading-in')
    }, fade)
  }

  function stop () {
    // set up gain node's fade out (in seconds)
    fadeGainNode(0, fade/1000)
    // emit 'gain' events throughout the fade
    emitGainDuringFade()
    // emit 'fading-out'
    emitter.emit('fading-out')
    // timeout to stop looping afer fade
    setTimeout(function () {
      sourceNode.stop()
      // done fading out now
      emitter.emit('done-fading-out')
      // clear interval that updates play progress
      clearInterval(progressInterval)
    }, fade)
  }

  // listen for errors
  emitter.start           = start
  emitter.stop            = stop
  emitter.loopProgress    = null// TODO
  return emitter
}
