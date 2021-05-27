const axios = require('axios')

const instance = axios.create({
  baseUrl: 'http://10.6.1.109:3031',
})

module.exports = instance