let looper = require('../src/loop-webaudio-node')
let loader = require('../src/load-file')
let url = 'ex.mp3'
function testWith (decodedBuff, audioContext) {
  let verify = ev => _ => console.log(ev)
  let check = (em, ev) => em.on(ev, verify(ev))
  let lupe = looper(decodedBuff, audioContext, 3000)
  check(lupe, 'fading-in')
  lupe.on('done-fading-in', () => {
    console.log('done fading in')
    check(lupe, 'fading-out')
    check(lupe, 'done-fading-out')
    lupe.stop()
  })
  lupe.start()
}
// Create an audio context
let ctx = require('audio-context')
// Load array buffer of audio
loader(url).on('buffer', arraybuffer => {
  // Create an audio node from it
  console.log(arraybuffer)
  ctx.decodeAudioData(arraybuffer, buff => {
    // Now we're ready to run our tests
    testWith(buff, ctx)
  }, function (err) {
    console.log('ERR DECODING BUFFER!', err)
  })
})
