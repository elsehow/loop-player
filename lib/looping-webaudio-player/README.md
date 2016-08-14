# looping-webaudio-player

responsible for loading an audio file, and looping it in a webaudio context. maintains some state: whether the file is `loading` or `playing`, and its `loadProgress` and `loopProgress`.

it also exposes the low-level `AudioBufferNode`, though you shouldn't need to access this.

## example

```js
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

- `.stop()` - fades audio out

`.AudioBufferNode` - AudioBufferNode or null

## develop

to watch test/index.js, and its dependencies

    npm run dev

now you can open localhost:9999 in your browser, and edit test/index.js or src/index.js

## license

BSD
