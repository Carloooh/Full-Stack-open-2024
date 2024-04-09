const Blog = require('../models/blog')
const User = require('../models/user')

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

const initialBlogs = [
    {
        title: "El arte de la programación",
        author: "Juan Pérez",
        url: "www.elartedelaprogramacion.com",
        likes: 150,
    },
    {
        title: "Aprendiendo JavaScript",
        author: "María Rodríguez",
        url: "www.aprendiendojavascript.com",
        likes: 200,
    },
]

const nonExistingId = async () => {
  const blog = new Blog({ title: 'willremovethissoon' })
  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = { initialBlogs, nonExistingId, blogsInDb, usersInDb }