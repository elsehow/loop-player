const createStore = require('minidux').createStore
const songLooper = require('./loop-webaudio-node')
const fileLoader = require('./load-file')

var initialState = {
  loading: false,
  looping: false,
  loadProgress: 0,
  loopProgress: 0,
  loopingWebAudioPlayer: null,
  gain: 0,
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

function setup (ctx, url, fade=300, playProgressPoll=100) {


  function start () {
    // reset loopProgress to 0
    dispatch('loopProgress', 0)
    // load url if there's no looper
    let loader = fileLoader(url) // TODO needn't load every time
    loader.on('progress', p => {
      dispatch('loading', true)
      dispatch('loadProgress', p)
    })
    loader.on('error', err => {
      dispatch('error', err)
    })
    loader.on('buffer', arraybuffer => {
      // Create an audio node from it
      ctx.decodeAudioData(arraybuffer, buff => {
        // TODO check if there's some old looper instance
        //      that we should fade out first
        let looper = songLooper(buff, ctx, fade, playProgressPoll)
        dispatch('loading', false)
        dispatch('loopingWebAudioPlayer', looper)
        // set up looper loadProgress
        looper.on('loop-progress', percent => {
          dispatch('loopProgress', percent)
        })
        // actually play looper
        looper.on('fading-in', () => {
          dispatch('looping', true)
        })
        looper.on('gain', g => {
          dispatch('gain', g)
        })
        looper.start()
      })
    })
  }

  function stop () {
    let looper = store.getState().loopingWebAudioPlayer
    if (looper) {
      looper.on('done-fading-out', () => {
        dispatch('looping', false)
      })
      looper.stop()
    }
    else
      dispatch('error', 'Tried to stop looping, but there is no looper yet. Is the file loaded?')
  }

  store.start = start
  store.stop = stop
  return store
}

module.exports = setup
