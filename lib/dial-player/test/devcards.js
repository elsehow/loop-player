const player = require('..')

// utility functions
let dummyOnclick = () => console.log('click lel')

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
  setInterval(function () {
    playerState.player.loopProgress =
      (playerState.player.loopProgress+.0009) % 1
    var newel = player(playerState, dummyOnclick)
    yo.update(el, newel)
  }, 5)

  return el
}

module.exports = [
  playingSong,
]
