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
  // `start` and `end` are floats 0-0.1
  // they become some x,y, coordinates on a circle `center`, `radius`
  // the start and endpoints describe an arc with `thickness` (px) and `color`
  function coors (percent) {
    // well, a circle is
    //   x = cx + r * cos(a)
    //   y = cy + r * sin(a)
    // so:
    let twopi=2*Math.PI
    let angle = twopi*percent
    let x = center+radius*Math.cos(angle)
    let y = center+radius*Math.sin(angle)
    return [x,y]
  }
  let starts = coors(start)
  let ends = coors(end)
  // sweep flag picks long vs short way around the circle
  let sweep = end-start > 0.5 ? 1 : 0 
  // start pt is    M x, y
  // end pt   is    last two of A
  return yo`<path d="
M ${starts[0]} ${starts[1]}
A ${radius} ${radius} 0 ${sweep} 1 ${ends[0]} ${ends[1]}
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
    if (state.player.looping) {
      var progress = state.player.loopProgress
      var dialFatness = .03
      var s = progress-dialFatness
      var e = progress+dialFatness
      return arc(center, radius, thickness, s, e, 'black')
    }
    return
  }
  // the progress bar is drawn on the ring
  // a float 0-1 is mapped to a point on the ring
  // and an arc is drawn from the top to that point
  function progress () {
    if (state.player.loading) {
      let progress = state.player.loadProgress
      return arc(center, radius, thickness, 0, progress, 'gray')
    }
    return
  }
  // return a yo template for an svg
  return yo`
    <svg
      style="background:${state.style.background}"
      onclick=${onclick}
      width="${state.style.size}px"
      height="${state.style.size}px">
  ${ring(center, radius, thickness, state.style.color, state.style.background)}
  ${progress()}
  ${dial()}
    </svg>
  `
}

