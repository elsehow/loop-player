# dial-player

a [yo-yo](template) that displays a circular dial UI.

## example

```js
var playerState = {
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

player(playerState, clickCb)
```

`player` returns some [yo-yo]() string template

`clickCb` will be called whenever the player is clicked.

## install

    npm install

## develop

to watch test/index.js, and its dependencies

    npm run dev

now you can open localhost:9999 in your browser, and edit test/index.js or src/index.js

## license

BSD
