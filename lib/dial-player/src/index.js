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
function ring (state) {
  var radius = state.style.size/2
  var padding = 10
  return yo`
    <circle
  cx="${radius}"
  cy="${radius}"
  r="${radius-padding/2}"
  stroke="${state.style.color}"
  stroke-width="${padding}"
  fill="${state.style.background}" />`
}
// we export a player function that takes a state
// like the one above
module.exports = function player (state) {
  return yo`<div
  style="
  background-color:${state.style.background};
  width: ${state.style.size}px;
  height: ${state.style.size}px;
  color: ${state.style.color}">
    <svg
    width="${state.style.size}"
    height="${state.style.size}">
      ${ring(state)}
    </svg>
  </div>`
}
