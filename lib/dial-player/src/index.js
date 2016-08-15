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
// we export a player function that takes a state
// like the one above
module.exports = function player (state, onclick) {

  var radius = state.style.size/2
  var padding = radius/10

  // the ring forms the background of the dial
  // the loading bar and the dial move over the ring
  // showing loading or play progress, respecively
  function ring () {
    return yo`
      <circle
    cx="${radius}"
    cy="${radius}"
    r="${radius-padding/2}"
    stroke="${state.style.color}"
    stroke-width="${padding}"
    fill="${state.style.background}" />`
  }
  // draws an arc on a circle
  // https://stackoverflow.com/questions/5737975/circle-drawing-with-svgs-arc-path
  // TODO this draws a cirlce over the ring
  // TODO but how to draw over only a segment of the ring?
  function arc (color) {
    return yo`<path d="
M 20 20
A 45 45 0 0 1 60 10
"
    stroke="${color}"
    stroke-width="${padding*2}"
    fill="rgba(0,0,0,0)"/>
      `
  }
// m -${radius} 0
// a ${radius} ${radius} 0 1 0 ${radius*2} 0
// a ${radius} ${radius} 0 1 0 ${radius*-2} 0"
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
  return yo`<div
  onclick=${onclick}
  style="
  background-color:${state.style.background};
  width: ${state.style.size}px;
  height: ${state.style.size}px;
  color: ${state.style.color}">
    <svg
    width="${state.style.size}"
    height="${state.style.size}">
      ${ring()}
      ${arc('gray')}
    </svg>
  </div>`
}

