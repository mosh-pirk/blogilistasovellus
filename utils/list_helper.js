const totalLikes = (blogs) => {
  return blogs.map(x => x.likes).reduce((x,y) => x+y)

}



module.exports = {
  totalLikes
}