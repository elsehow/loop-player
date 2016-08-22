const createStore = require('minidux').createStore
const looper = require('./loop-webaudio-node')
const loader = require('./load-file')
const playProgressPoll = 100

var initialState = {
  loading: false,
  looping: true,
  loadProgress: 0,
  loopProgress: 0,
  loopingWebAudioPlayer: null,
  error: null,
}

function reducer (state, action) {
  state[action.type] = action.val
  return state
}

let store = createStore(reducer, initialState)

function dispatch (ev, val) {
  let msg = {}
  msg.type = ev
  msg.val = val
  store.dispatch(msg)
}

function setup (ctx, url, fade=300) {


  function start () {
    let ldr = loader(url)
    ldr.on('progress', p => {
      dispatch('loading', true)
      dispatch('loadProgress', p)
    })
    ldr.on('error', err => {
      dispatch('error', err)
    })
    ldr.on('buffer', arraybuffer => {
      // Create an audio node from it
      console.log(arraybuffer)
      ctx.decodeAudioData(arraybuffer, buff => {
        // TODO check if there's some old looper instance
        //      that we should fade out first
        let lpr = looper(buff, ctx, fade, playProgressPoll)
        dispatch('loading', false)
        dispatch('loopingWebAudioPlayer', lpr)
        // set up lpr loadProgress
        lpr.on('loop-progress', percent => {
          dispatch('loopProgress', percent)
        })
        // actually play lpr
        lpr.on('fading-in', () => {
          dispatch('looping', true)
        })
        lpr.start()
      })
    })
  }

  function stop () {
    let lpr = store.getState().loopingWebAudioPlayer
    if (lpr) {
      lpr.on('done-fading-out', () => {
        dispatch('looping', false)
      })
      lpr.stop()
    }
    else
      dispatch('error', 'Tried to stop looping, but there is no looper yet. Is the file loaded?')
  }

  store.start = start
  store.stop = stop
  return store
}

module.exports = setup
