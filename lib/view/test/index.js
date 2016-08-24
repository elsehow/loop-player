var ud = require('ud');
var yo = require('yo-yo')
// everything in this function will get updated on change
var setup = ud.defn(module, function () {
  var devcards = require('./devcards')
  document.body.innerHTML = ''
  devcards.forEach(devcard => {
    let el = devcard(yo)
    document.body.appendChild(el)
  })
})
// will re-run setup() whenever setup defn changes
setup()

