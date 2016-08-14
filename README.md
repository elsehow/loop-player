# looops player

a circular UI for playing audio loops

## example

```js
var player = looping('files/banger.mp3', 500)
```

`player` is [yo-yo]() template string representing the player - a single div.

when clicked, the player will load `files/banger.mp3`, and fade it in over the course of 500ms, looping it.

when clicked again, it will fade the loop out over 500ms.

the progress of the loading, or song playing, is displayed in the dial.

## install

    npm install

## developing

to watch test/index.js, and its dependencies

    npm run dev

now you can open localhost:9999 in your browser, and edit test/index.js or src/index.js

## license

BSD
