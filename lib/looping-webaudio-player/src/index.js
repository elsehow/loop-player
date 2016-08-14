/* looping-webaudio-player
   nick merrill / http://cosmopol.is
   berkeley 2016

   takes audio context, and url to some audio, as well as a time (in ms) to fade in/out audio

   looper('banger.mp3', ctx, 500)

   returns an object with two methods

   - start()
   - stop()
   - loading - boolean
   - looping - boolean
   - willPlay - boolean
   - loadProgress - 0-1
   - loopProgress - 0-1
   - .on('error', err)

   food for thought:
   search for the phrase 'paradigm of mutating properties'
   do we really want state to change with silent mutations?
   or do we just emit events?
   if we emit events, do we even maintain internal state?

   i think this should all be driven by calling context
   if we're just doing requestAnimationFrame() and updating at some rate anywa
   then fine, skip the events, and just mutate up by reference
   if we're wanting to listen for changes...well, we can modify that later
   so leave it how it isfor now

*/
const EE = require('events').Eventemitter
const load = require('./load-file')

module.exports = function (ctx, url, fade=300) {

  let AudioBufferNode = null
  let loading, looping, willPlay = false
  let loadProgress, loopProgress = null
  let loader; // reference we keep around to a file loader

  let emitter = new EE()

  function start () {
    if (!AudioBufferNode) {
      // we are intending to play
      willPlay = true // paradigm of mutating properties
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
        if (willPlay) {
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
        }
      })
      // we're done for now
      // if the loading succeeds, it will call start() again (above)
      // otherwise, it will emit an error (hopefully!)
      return
    }

    // if we have an audio buffer, fade it in
    // TODO fadeInLoop(AudioBufferNode, fade)
    looping = true
    willPlay = false
    return
  }

  function stop () {
    if (loading)
      return loader.removeAllListeners('buffer') // this will prevent us from playing when loading is done
    willPlay = false
    // TODO fadeOutNode(AudioBufferNode, fade)
    setTimeout(() => looping=false, fade)
    return // AudioBufferNode.stop()
  }

  emitter.loading         = loading
  emitter.looping         = looping
  emitter.loadProgress    = loadProgress
  emitter.loopProgress    = loopProgress
  emitter.start           = start
  emitter.stop            = stop
  emitter.AudioBufferNode = AudioBufferNode
  return emitter
}
