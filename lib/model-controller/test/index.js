const ud = require('ud');
// everything in this function will get updated on change
var setup = ud.defn(module, function (state) {

  // require('../test/load-file')
  // require('../test/loop-webaudio-node')
  let fade = 3000
  let ctx = require('audio-context')
  var modelcont = require('..')(ctx, 'char.wav', fade)
  modelcont.subscribe(function (state) {
    console.log('state!', state)
  })
  // start
  modelcont.start()
  // stop
  setTimeout(modelcont.stop, fade)
})
// will re-run setup() whenever method changes
setup()
