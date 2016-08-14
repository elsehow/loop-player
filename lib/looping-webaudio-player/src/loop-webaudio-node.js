/* loop-webaudio-node.js
   nick merrill / http://cosmopol.is
   berkeley 2016

takes audio context, and url to some audio, as well as a time (in ms) to fade in/out audio

  looper(AudioNode, 500)

returns an object with two methods

- start()
- stop()
- loopProgress - 0-1
- .on('error', err)

*/
const EE = require('events').Eventemitter

module.exports = function (node, fade=300) {

  let looping = false
  let loopProgress = null
  let emitter = new EE()

  function start () {
    // set looping to true
    // start looping
    // interval for loopProgress
    // listen for errors
  }

  function stop () {
    // set looping to false
    // stop looping
    // clear interval for loopProgress
    // listen for errors
  }

  emitter.start           = start
  emitter.stop            = stop
  emitter.loopProgress    = loopProgress
  return emitter
}