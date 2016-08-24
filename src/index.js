const yo = require('yo-yo')
const view = require('../lib/view')
const modelcont = require('../lib/model-controller')
const ctx = require('audio-context')
let defaultStyle = {
  size: 120,               // px, player is square
  color: '#bbb',          // some css color
}
module.exports = function (url, queryselector, style, fade=1000) {
  if (!style) style = defaultStyle
  let docnode = document.querySelector(queryselector)
  let player = modelcont(ctx, url, fade, 30)
  function clickCb () {
    let state = player.getState()
    if (!state.looping)
      return player.start()
    return player.stop()
  }
  function playerV (state) {
    return view({
      style: style,
      player: state,
    }, clickCb)
  }
  let initialState = player.getState()
  let el = playerV(initialState)
  player.subscribe(state => {
    var newEl = playerV(state)
    yo.update(el, newEl)
  })
  docnode.appendChild(el)
}
