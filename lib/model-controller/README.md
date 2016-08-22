# model-controller

responsible for loading an audio file, and looping it in a webaudio context. maintains some state: whether the file is `loading` or `playing`, and its `loadProgress` and `loopProgress`.

it also exposes the low-level `AudioBufferNode`, though you shouldn't need to access this.

## example

```js
let player = looping(webCtx, 'banger.mp3', 500)
// get updates on new states
player.subscribe(function (state) {console.log(state)})
// fade the song in
player.start() 
// after 3000 ms, start to fade the song out
setTimeout(player.stop, 3000)
```

## install

    npm install
    
## api

### looping(webCtx, fileUrl, fadeTime)

takes an audio context, and a url to some sound file

returns a [minidux](https://www.npmjs.com/package/minidux) `store`, each state of which has the properties:

`.error` - an error, or null

`.loading`- boolean

`.looping` - boolean

`.loadProgress` - float 0-1

`.loopProgress`- float 0-1 

`.start()` - loads audio if not loaded; starts to play (fading in) if/when loaded

`.stop()` - fades audio out. if loading, aborts the load.

`.AudioBuffer` - A decoded audio buffer, or null (you shouldn't need to access this)

## develop

to watch test/index.js, and its dependencies

    npm run dev

now you can open localhost:9999 in your browser, and edit test/index.js or src/index.js

## license

BSD
