/*

  state might be

  {
    style: {
      size: 30,           // px, player is square
      color: '#00ff',     // hex + alpha
      background: '#ffff' // hex + alpha
    },
    state: {
      loading: true,
      loadProgress: 0.5,
      looping: false,
      loopProgress: null,
    }
  }

  */
var yo = require('yo-yo')
// the ring forms the background of the dial
// the loading bar and the dial move over the ring
// showing loading or play progress, respecively
function ring (radius, padding, color, background) {
  return yo`
    <circle
  cx="${radius}"
  cy="${radius}"
  r="${radius-padding/2}"
  stroke="${color}"
  stroke-width="${padding}"
  fill="${background}" />`
}
// draws an arc on a circle
// `start` and `end` are floats from 0-1
function arc (radius, padding, start, end, color) {
  // TODO
  // start x,y is    M x, y
  // end x,y   is    last two of A
  // calculate those from start, end % !
  return yo`<path d="
M 20 20
A ${radius} ${radius} 0 0 1 60 10
"
  stroke="${color}"
  stroke-width="${padding*2}"
  fill="rgba(0,0,0,0)"/>`
}
// we export a player function that takes a state
// like the one above
module.exports = function player (state, onclick) {
  // settings for the ring geometry
  var radius = state.style.size/2
  var padding = radius/10
  // the dial shows the play progress
  // a float 0-1 is mapped to a point on the ring
  // and the dial is drawn there
  function dial () {
  }
  // the progress bar is drawn on the ring
  // a float 0-1 is mapped to a point on the ring
  // and an arc is drawn from the top to that point
  function progress () {
  }
  // return a yo template for an svg
  return yo`
    <svg
      style="background:${state.style.background}"
      onclick=${onclick}
      width="${state.style.size}px"
      height="${state.style.size}px">
        ${ring(radius, padding, state.style.color, state.style.background)}
        ${arc(radius, padding, 0, 0.1, 'gray')}
    </svg>
  `
}

