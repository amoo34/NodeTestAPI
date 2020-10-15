const express = require('express')
const server = express()

const app = require('./app')

server.use(app)

const port = process.env.PORT || 3003
server.listen(port,()=>console.log(port))
