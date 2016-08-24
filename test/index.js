var ud = require('ud');

// everything in this function will get updated on change
var setup = ud.defn(module, function (state) {
  document.body.innerHTML ='<div id="my-cool-player"> </div>'
  var player = require('..')
  var dial = player('char.wav', "#my-cool-player")
})

// will re-run setup() whenever method changes
setup()
