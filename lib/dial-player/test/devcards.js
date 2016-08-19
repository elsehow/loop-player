const player = require('..')
const yo = require('yo-yo')

// utility functions
let dummyOnclick = () => console.log('click lel')
let inch = (val, speed) => (val+speed) % 1
function repeatedly (lastel, yo, state, cb) {
  var el;
  setInterval(function () {
    cb()
    var newel = player(state, dummyOnclick)
    yo.update(lastel, newel)
    el = newel
  }, 20)
}

function displayNicely (el, title) {
  return yo`<div>
    ${el}
    <h1>${title}</h1>
    </div>`
}

// devcards
// devcards take `yo` instance
// and return some yo-yo template string
function playingSong (yo) {
  let playerState = {
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
  let el = player(playerState, dummyOnclick)
  // increase loop progress
  repeatedly(el, yo, playerState, function () {
    playerState.player.loopProgress =
      inch(playerState.player.loopProgress, .009)
  })

  return displayNicely(el, 'dial')
}

function loadingSong (yo) {
  let playerState = {
    style: {
      size: 120,              // px, player is square
      color: 'yellow',        // some css color
      background: 'black'     // some css color
    },
    player: {
      loading: true,
      loadProgress: 0,
      looping: false,
      loopProgress: null,
    }
  }
  let el = player(playerState, dummyOnclick)
  // increase loop progress
  repeatedly(el, yo, playerState, function () {
    playerState.player.loadProgress =
      inch(playerState.player.loadProgress, .003)
  })
  return displayNicely(el, 'progress bar')
}
module.exports = [
  playingSong,
  loadingSong,
]
