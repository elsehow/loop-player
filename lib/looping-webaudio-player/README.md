# looping-webaudio-player

responsible for loading an audio file, and looping it in a webaudio context. maintains some state: whether the file is `loading` or `playing`, and its `loadProgress` and `loopProgress`.

it also exposes the low-level `AudioBufferNode`, though you shouldn't need to access this.

## example

```js
let player = looping(webCtx, 'banger.mp3', 500)
player.on('loading', () => console.log('loading!'))
player.on('load-progress, p => console.log('loaded', p))
player.on('done-loading', () => console.log('done loading!'))
player.on('fading-in', () => console.log('fading in!'))
player.on('done-fading-in', () => console.log('done fading in!'))
player.on('fading-out', () => console.log('fading out!'))
player.on('done-fading-out', () => console.log('done fading out!'))
// will load, then play banger.mp3, fading in over 500 ms
player.start() 
// after 3000 ms, start to fade the song out
setTimeout(player.stop, 3000)
```

## install

    npm install
    
## api

### looping(webCtx, url)

takes an audio context, and a url to some sound file

returns an object `player` with the properties

`.loading`- boolean

`.looping` - boolean

`.loadProgress` - float 0-1

`.loopProgress`- float 0-1 

- `.start()` - loads audio if not loaded; starts to play (fading in) if/when loaded

- `.stop()` - fades audio out. if loading, aborts the load.

`.AudioBufferNode` - AudioBufferNode or null

## develop

to watch test/index.js, and its dependencies

    npm run dev

now you can open localhost:9999 in your browser, and edit test/index.js or src/index.js

## license

BSD
