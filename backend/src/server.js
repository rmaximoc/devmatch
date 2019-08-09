const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const server = express()
const routes = require('./routes')

mongoose.connect('mongodb://localhost:27017/devmatch', { useNewUrlParser: true })

server.use(cors())
server.use(express.json())
server.use(routes)

server.listen(3001)