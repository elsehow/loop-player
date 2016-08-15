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
function ring (center, radius, thickness, color, background) {
  return yo`
    <circle
  cx="${center}"
  cy="${center}"
  r="${radius}"
  stroke="${color}"
  stroke-width="${thickness}"
  fill="${background}" />`
}
// draws an arc on a circle
// `start` and `end` are floats from 0-1
function arc (center, radius, thickness, start, end, color) {

  // 0, 0.1  becomes some x,y coordinates
  // we do this with a start and end,
  // and i think our problems will be solved

  // well, a circle is

  //   x = cx + r * cos(a)
  //   y = cy + r * sin(a)

  // https://stackoverflow.com/questions/839899/how-do-i-calculate-a-point-on-a-circle-s-circumference

  function coors (percent) {
    var twopi=2*Math.PI
    var cxplusr = center + radius
    var y =  cxplusr*Math.cos(twopi*percent)
    var x = cxplusr*Math.sin(twopi*percent)
    console.log(x,y)
    return [x,y]
  }
// start x,y is    M x, y
// end x,y   is    last two of A
  starts = coors(start)
  ends = coors(end)
  return yo`<path d="
M ${starts[0]} ${starts[1]}
A ${radius} ${radius} 0 0 1 ${ends[0]} ${ends[1]}
"
  stroke="${color}"
  stroke-width="${thickness}"
  fill="rgba(0,0,0,0)"/>`
}
// we export a player function that takes a state
// like the one above
module.exports = function player (state, onclick) {
  // settings for the ring geometry
  var size = state.style.size
  var thickness = size/20
  var center = size/2
  var radius = size/2 - thickness/2
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
    ${ring(center, radius, thickness, state.style.color, state.style.background)}
    ${arc(center, radius, thickness, 0, 0.1, 'gray')}
    </svg>
  `
}

