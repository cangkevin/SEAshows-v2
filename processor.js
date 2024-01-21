const index = require('./build/tests/index.spec.js')

async function runLoadHomePage(page) {
  await index.loadHomePage(page)
}

module.exports = { runLoadHomePage }
