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
    state: {
      loading: true,
      loadProgress: 0.5,
      looping: false,
      loopProgress: null,
    }
  }
  var el = player(playerState, function () {
    console.log('clicked!')
  })
  console.log('loaded')
  document.body.innerHTML = ''
  document.body.appendChild(el)
})
// will re-run setup() whenever setup defn changes
setup()

