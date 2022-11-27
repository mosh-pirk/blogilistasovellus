const mongoose = require('mongoose')

const config = require('./utils/config')
const logger = require('./utils/logger')

const blogsRouter = require('./controllers/blogs')
const middleware = require('./utils/middleware')


const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.static('build'))
app.use(express.json())

logger.info('connecting to', config.MONGO_URL)

mongoose.connect(config.MONGO_URL)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
  }).finally()


app.use(middleware.requestLogger)
app.use('/api/blogs', blogsRouter)

app.use(middleware.errorHandler)
app.use(middleware.unknownEndpoint)


module.exports = app


// localhost:8080/api/blogs