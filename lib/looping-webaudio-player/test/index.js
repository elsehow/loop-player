const ud = require('ud');
// everything in this function will get updated on change
var setup = ud.defn(module, function (state) {
  require('../test/load-file')
  // let looping = require('..')
  // let player = looping(webCtx, 'banger.mp3', 500)
  // player.on('error', err => console.log('ERROR!!!', err))
  // player.on('loading', () => console.log('loading!'))
  // player.on('load-progress', p => console.log('loaded', p))
  // player.on('done-loading', () => console.log('done loading!'))
  // player.on('fading-in', () => console.log('fading in!'))
  // player.on('done-fading-in', () => console.log('done fading in!'))
  // player.on('fading-out', () => console.log('fading out!'))
  // player.on('done-fading-out', () => console.log('done fading out!'))
  // // will load, then play banger.mp3, fading in over 500 ms
  // player.start()
  // // after 3000 ms, start to fade the song out
  // setTimeout(player.stop, 3000)
})
// will re-run setup() whenever method changes
setup()
