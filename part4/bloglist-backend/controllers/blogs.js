const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const jwt = require('jsonwebtoken')
const User = require('../models/user')

blogsRouter.get("/", async (request, response, next) => {
    const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1, id: 1 })
    response.json(blogs);
});

blogsRouter.get("/:id", async (request, response, next) => {
    const blog = await Blog.findById(request.params.id);
    if (blog) {
        response.json(blog);
    } else {
        response.status(404).end();
    }
});

blogsRouter.post("/", async (request, response, next) => {
    const body = request.body;
    const user = request.user;
  
    if (!user) {
      return response.status(401).json({ error: 'token missing or invalid' });
    }
  
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes || 0,
      user: user.id
    });
    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();
    response.status(201).json(savedBlog);
  });

blogsRouter.delete('/:id', async (request, response, next) => {
    try {
      const user = request.user;

      if (!user) {
        return response.status(401).json({ error: 'token missing or invalid' });
      }
      const blog = await Blog.findById(request.params.id);
      if (!blog) {
        return response.status(404).json({ error: 'blog not found' });
      }
  
      if (blog.user.toString() !== user._id.toString()) {
        return response.status(403).json({ error: 'only the creator can delete blogs' });
      }
      await Blog.findByIdAndDelete(request.params.id);
      response.status(204).end();
    } catch (error) {
      next(error);
    }
});

blogsRouter.put("/:id", async (request, response, next) => {
    const body = request.body;
    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    };

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true, runValidators: true, context: 'query' });
    response.json(updatedBlog);
});

module.exports = blogsRouter;