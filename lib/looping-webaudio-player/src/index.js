/* looping-webaudio-player
   nick merrill / http://cosmopol.is
   berkeley 2016

   takes audio context, and url to some audio, as well as a time (in ms) to fade in/out audio

   let player = looper('banger.mp3', ctx, 500)

   returns an object with two methods

   - start()
   - stop()

   player.start() and player.stop() will fade
   in/out 'banger.mp3' over 500 ms, and loop it.

   player will also fire some events:

   - 'error', err
   - 'loading'
   - 'load-progress', percent
   - 'done-loading'
   - 'fading-in'
   - 'done-fading-in'
   - 'fading-out'
   - 'done-fading-out'

   player also has the low-level property AudioBufferNode.
   you can use this to find e.g. its progress through the loop

*/
const EE = require('events').Eventemitter
const load = require('./load-file')

module.exports = function (ctx, url, fade=300) {

  let AudioBufferNode = null
  let loading, looping = false
  let loadProgress, loopProgress = null
  let loader; // reference we keep around to a file loader

  let emitter = new EE()

  function start () {
    if (!AudioBufferNode) {
      // load the url
      loader = load(url)
      // update the progress
      loader.on('progress', percent => {
        loadProgress = percent // paradigm of mutating properties
      })
      loader.on('error', err => {
        emitter.emit('error', err)
        loading=false // paradigm of mutating properties
      })
      loading=true // paradigm of mutating properties
      // on buffer, set up node,
      // and call start again!
      loader.on('buffer', function () {
        // no longer loading
        loading = false
        // no longer planning to play
        willPlay = false
        // set up the audio node
        AudioBufferNode = new AudioBufferNode(buffer, ctx)
        // and call start again!
        // this time it will just play,
        // because we already have an audio buffer
        start()
      })
      // we're done for now
      // if the loading succeeds, it will call start() again (above)
      // otherwise, it will emit an error (hopefully!)
      return
    }

    // if we have an audio buffer, fade it in
    // TODO fadeInLoop(AudioBufferNode, fade)
    looping = true
    return
  }

  function stop () {
    if (loading) {
      loader.abort()
      return loader.removeAllListeners('buffer') // this will prevent us from playing when loading is done
    }
    // TODO fadeOutNode(AudioBufferNode, fade)
    setTimeout(() => looping=false, fade)
    return // AudioBufferNode.stop()
  }

  emitter.start           = start
  emitter.stop            = stop
  emitter.AudioBufferNode = AudioBufferNode
  return emitter
}
