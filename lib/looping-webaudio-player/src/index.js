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
   - loadProgress - 0-1
   - loopProgress - 0-1
   - .on('error', err)

*/
const EE = require('events').Eventemitter

module.exports = function (ctx, url, fade=300) {

  let AudioBufferNode = null
  let loading, looping = false
  let loadProgress, loopProgress = null

  let emitter = new EE()

  function start () {
    if (!AudioBufferNode) {
      // load(url)
      // loading is true!
      // set up progress listeners...
      // set up error listener....
      // on buffer, set up node,
      maanger
      // and call start again!
      return
    }

    // start loop the buffer
    // set up interval for progress!
    // loading is false!
    return // AudioBufferNode.loop()
  }

  function stop () {
    if (loading)
      return // abort()
    // stop interval for progress?
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
