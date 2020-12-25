'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"dev"',
  HOST: '"127.0.0.1"',
  PORT: '"8080"',
  API_URL: '"http://127.0.0.1:9090"'
})
