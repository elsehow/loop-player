var ud = require('ud');
var yo = require('yo-yo')
// everything in this function will get updated on change
var setup = ud.defn(module, function () {
  var player = require('..')
  var playerState = {
    style: {
      size: 120,               // px, player is square
      color: '#fff',          // some css color
      background: 'dodgerblue' // some css color
    },
    player: {
      loading: false,
      loadProgress: 1,
      looping: true,
      loopProgress: 0,
    }
  }
  function dummyOnclick () {
    console.log('click lel')
  }
  var el = player(playerState, dummyOnclick)
  document.body.innerHTML = ''
  document.body.appendChild(el)
  // dummy increase loop progress
  setInterval(function () {
    playerState.player.loopProgress =
      (playerState.player.loopProgress+.0009) % 1
    var newel = player(playerState, dummyOnclick)
    yo.update(el, newel)
  }, 5)
})
// will re-run setup() whenever setup defn changes
setup()

