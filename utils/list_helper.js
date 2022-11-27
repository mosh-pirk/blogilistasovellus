const remove = require('lodash').remove
const totalLikes = (blogs) => {
  return blogs.map(x => x.likes).reduce((x,y) => x+y)

}

const favoriteBlog = (blogs) => {
  let forTestBlog =[...blogs]

  forTestBlog = forTestBlog.sort((x, y) => x.likes - y.likes)
  return forTestBlog.slice(-1).map(x => ({
    title: x.title,
    author: x.author,
    likes: x.likes

  }))[0]

}

const numberOfWriterBlogs = (blogs, author) => {
  const authorBlogs = remove(blogs, x => {
    return  x.author === author
  })

  return {
    author: author,
    blogs: authorBlogs.length
  }
}

const mostLikes = (blogs) => {
  const favoriteBlogAuthor = favoriteBlog(blogs).author
  const authorBlogs = remove(blogs, x => {
    return  x.author === favoriteBlogAuthor
  })

  const numberOfLikes = totalLikes(authorBlogs)

  return {
    author: favoriteBlogAuthor,
    likes: numberOfLikes
  }
}

module.exports = {
  totalLikes,
  favoriteBlog,
  numberOfWriterBlogs,
  mostLikes
}