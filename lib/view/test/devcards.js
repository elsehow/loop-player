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
      color: 'dodgerblue',          // some css color
    },
    player: {
      loading: false,
      loadProgress: 1,
      looping: true,
      loopProgress: 0,
      gain: 1,
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

function fadingSong (yo) {
  let playerState = {
    style: {
      size: 120,               // px, player is square
      color: '#ddd',          // some css color
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
      inch(playerState.player.loopProgress, .003)
    playerState.player.gain=
      inch(playerState.player.loopProgress, .009)
  })

  return displayNicely(el, 'fading')
}

function loadingSong (yo) {
  let playerState = {
    style: {
      size: 120,              // px, player is square
      color: 'yellow',        // some css color
    },
    player: {
      loading: true,
      loadProgress: 0,
      looping: false,
      loopProgress: null,
      gain:0,
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
function errorSong (yo) {
  let playerState = {
    style: {
      size: 120,
      color: 'blue',
    },
    player: {
      error: new Error('OUCH!! Big boo boo.'),
      loading: false,
      loadProgress: 1,
      looping: false,
      loopProgress: 0.4229503429862949,
      gain: 0,
    }
  }
  let el = player(playerState, dummyOnclick)
  return displayNicely(el, 'erroring player')
}
module.exports = [
  playingSong,
  fadingSong,
  loadingSong,
  errorSong,
]
