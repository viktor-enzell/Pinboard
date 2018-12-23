const { run } = require('runjs')

function notice () {
  install()
  startsite()


}

function install () {
  run('npm install')
  run('npm install --prefix ./client')
}

function startsite () {
  run('node server.js & npm start --prefix ./client');


}

module.exports = {
  notice
}