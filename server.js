/* eslint-disable no-console */
const express = require('express')
const path = require('path')

const port = process.env.PORT || 4001
const app = express()

app.get('^/$', (req, res, next) => {
  const address = req.headers['x-forwarded-for'] || req.connection.remoteAddress
  console.log(`request from ${address}`)
  next()
})

app.use('/', express.static(path.join(__dirname, 'public')))

app.listen(port, () => {
  console.log(`Web server listening on port ${port}!`)
})
