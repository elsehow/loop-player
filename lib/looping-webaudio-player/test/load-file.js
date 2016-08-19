let load = require('../src/load-file')
let url = 'ex.mp3'
let test = require('tape')

test('takes url to an asset', t => {
  let loader = load(url)
  // percent is a number 0-1
  loader.on('progress', percent => {
    t.ok(percent, 'percent is' + percent)
    t.ok(percent <= 1, 'percent less than 1')
    t.ok(percent >= 0, 'percent more than 0')
  })
  loader.on('buffer', arraybuffer => {
    t.ok(arraybuffer)
    console.log(arraybuffer)
    t.end()
  })
  loader.on('error', err => {
    t.notOk(err)
  })
})

// TODO
test('cancel the request', t => {
  let loader = load(url)
  loader.on('aborted', () => {
    t.ok(true)
    t.end()
  })
  loader.on('progress', loader.abort)
})

test('req a song that doesnt exist', t => {
  let loader = load('fake-song')
  loader.on('error', err => {
    t.ok(err)
    t.end()
  })
})
