/* loop-webaudio-node.js
   nick merrill / http://cosmopol.is
   berkeley 2016

takes audio context, and url to some audio, as well as a time (in ms) to fade in/out audio

  looper(AudioNode, 500)

returns an object with two methods

- start()
- stop()
- loopProgress - 0-1
- .on('fading-in', ...)
- .on('done-fading-in', ...)
- .on('fading-out', null ...)
- .on('done-fading-out', ...)
- .on('error', err => {})

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

module.exports = function (buff, ctx, fade=300) {

  let looping = false
  let loopProgress = null
  let emitter = new EE()

  let { sourceNode , gainNode } = sourceToGain(buff, ctx)

  function fadeGainNode (value, seconds) {
    gainNode
      .gain
      .linearRampToValueAtTime(value,
                               ctx.currentTime
                               + seconds)
    return
  }


  function start () {
    // set up fade
    fadeGainNode(1.0,fade/1000)
    // start looping
    sourceNode.start(0);
    // emit 'fading in'
    emitter.emit('fading-in')
    // timeout to emit 'faded-in'
    setTimeout(function () {
      emitter.emit('done-fading-in')
    }, fade)
  }

  function stop () {
    // set up fade!
    fadeGainNode(0, fade/1000)
    // emit 'fading-out'
    emitter.emit('fading-out')
    // timeout to stop looping; emit 'faded-in'
    setTimeout(function () {
      sourceNode.stop()
      emitter.emit('done-fading-out')
    }, fade)
  }

  // listen for errors
  emitter.start           = start
  emitter.stop            = stop
  emitter.loopProgress    = null// TODO
  return emitter
}
