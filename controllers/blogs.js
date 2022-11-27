const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
/**
 * GET ALL
 * @type {Router}
 */
blogsRouter.get('/', (req, res, next) => {
  Blog.find({})
    .then(data => res.status(200).send(data))
    .catch((error => next(error)))
})

/**
 * GET ONE
 * @type {Router}
 */
blogsRouter.get('/:id', (req, res, next) => {
  Blog.findById({ _id: req.params.id })
    .then(data => res.status(200).json(data))
    .catch(error => next(error))

})

/**
 * POST ONE
 * @type {Router}
 */
blogsRouter.post('/', (req, res, next) => {
  const body = req.body
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    like: body.like
  })

  blog.save().then(data => res.status(204).json(data))
    .catch(error => next(error))

})

/**
 * PUT ONE
 * @type {Router}
 */
blogsRouter.put('/:id', (req, res, next) => {
  Blog.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(data => res.status(200).json(data))
    .catch(error => next(error))

})

/**
 * DELETE ONE
 * @type {Router}
 */
blogsRouter.delete('/:id', (req, res, next) => {
  Blog.findByIdAndRemove({ _id:req.params.id })
    .then(() => res.status(204).end())
    .catch(error => next(error))

})

module.exports = blogsRouter
