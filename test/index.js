var ud = require('ud');

// everything in this function will get updated on change
var setup = ud.defn(module, function (state) {
  console.log(require('..'))
})

// will re-run setup() whenever method changes
setup()
