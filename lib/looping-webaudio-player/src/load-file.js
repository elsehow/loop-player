
/* Network manager
   nick merrill / http://cosmopol.is
   berkeley 2016

exposes a method

   load(url)

takes url to an asset,

returns an object with methods:

  .on('progress', percent)

percent is a number 0-1

  .on('buffer', AudioBufferNode)

something you can make a

  .on('error', err)

something that went wrong

  .abort()

 cancel the request

  */

var EE = require('events').EventEmitter
module.exports = (url) => {

  let emitter = new EE()
  let req = new XMLHttpRequest();

  // emit 'buffer' event with an array buffer
  function emitBuffer (e) {
    let arraybuffer = req.response
    emitter.emit('buffer', arraybuffer)
  }

  // emit 'progress' (float 0-1)
  function emitProgress (ev) {
    if (ev.lengthComputable) {
      let percent = ev.loaded / ev.total
      emitter.emit('progress', percent)
    }
    // else
      // emitter.emit('error', 'Unable to comptue progress - total filesize is unknown!')
  }

  function emitError (err) {
    emitter.emit('error', err)
  }

  function emitAborted () {
    emitter.emit('aborted', null)
  }
  // setup listeners
  req.addEventListener('load', emitBuffer)
  req.addEventListener('error', emitError)
  req.addEventListener('progress', emitProgress)
  req.addEventListener('abort', emitAborted)
  req.addEventListener('timeout', emitError)
  // deal with bad responses
  req.onloadend = function() {
    let status = req.status
    if(status != 200)  {
      let err = new Error(`Bad XHR status: ${status}`)
      emitError(err)
    }
  }

  // add abort() method
  emitter.abort = () => req.abort()

  // request the binary
  req.open("GET", url)
  req.responseType = "arraybuffer"
  req.send()

  return emitter
}
