const { test, after, beforeEach, describe } = require("node:test");
const mongoose = require("mongoose");
const assert = require("node:assert");
const helper = require("./test_helper");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const Blog = require("../models/blog");
const bcrypt = require('bcrypt')
const User = require('../models/user')

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })
    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    assert.ok(usernames.includes(newUser.username))
  })

  test('creation fails if username is already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'password',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    assert.ok(result.body.error.includes('`username` to be unique'))

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })

  test('creation fails if username or password is missing', async () => {
    const usersAtStart = await helper.usersInDb()
  
    let newUser = {
      name: 'New User',
      password: 'password',
    }
  
    let result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  
    assert.strictEqual(result.body.error, 'password and username must be given')
  
    newUser = {
      username: 'newuser',
      name: 'New User',
    }
  
    result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  
    assert.strictEqual(result.body.error, 'password and username must be given')
  
    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })
  
  test('creation fails if username or password is less than 3 characters long', async () => {
    const usersAtStart = await helper.usersInDb()
  
    let newUser = {
      username: 'ab',
      name: 'Short User',
      password: 'password123',
    }
  
    let result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  
    assert.strictEqual(result.body.error, 'username and password must be at least 3 characters long')
  
    newUser = {
      username: 'newuser',
      name: 'New User',
      password: '12',
    }
  
    result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  
    assert.strictEqual(result.body.error, 'username and password must be at least 3 characters long')
  
    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })  
})


describe("when there is initially some blogs saved", () => {
  let token = null;
  let loginUser = null;

  beforeEach(async () => {
    await Blog.deleteMany({});

    const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog));
    const promiseArray = blogObjects.map((blog) => blog.save());
    await Promise.all(promiseArray);
  });

  beforeEach(async () => {
    await Blog.deleteMany({});

    const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog));
    const promiseArray = blogObjects.map((blog) => blog.save());
    await Promise.all(promiseArray);

    const user = {
      username: "root",
      password: "sekret",
    };

    loginUser = await api
      .post("/api/login")
      .send(user);

    token = `bearer ${loginUser.body.token}`;
  });

  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("all blogs are returned", async () => {
    const response = await api.get("/api/blogs");
    assert.strictEqual(response.body.length, helper.initialBlogs.length);
  });

  test("unique identifier property of the blog posts is named id", async () => {
    const response = await api.get("/api/blogs");
    assert(response.body[0].id);
  });

  describe("addition of a new blog", () => {
    test("a valid blog can be added ", async () => {
      const newBlog = {
        title: "FSO Course",
        author: "Helsinki University",
        url: "fullstackopen.com",
        likes: 999,
        user: loginUser.id
      };
  
      await api
        .post("/api/blogs")
        .set('Authorization', token)
        .send(newBlog)
        .expect(201)
        .expect("Content-Type", /application\/json/);
  
      const blogsAtEnd = await helper.blogsInDb();
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1);
  
      const titles = blogsAtEnd.map((n) => n.title);
      assert(titles.includes("FSO Course"));
    });

    test("blog without likes property defaults to zero", async () => {
      const newBlog = {
        title: "FSO Course",
        author: "Helsinki University",
        url: "fullstackopen.com",
        user: loginUser.id
      };

      const response = await api
        .post("/api/blogs")
        .set('Authorization', token)
        .send(newBlog)
        .expect(201)
        .expect("Content-Type", /application\/json/);

      assert.strictEqual(response.body.likes, 0);
    });

    test("blog without title and url properties is not added", async () => {
      const newBlog = {
        author: "Helsinki University",
        likes: 999,
        user: loginUser.id
      };
      await api.post("/api/blogs").set('Authorization', token).send(newBlog).expect(400);

      const blogsAtEnd = await helper.blogsInDb();
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length);
    });

    test("adding a blog fails if a token is not provided", async () => {
      const newBlog = {
        title: "FSO Course",
        author: "Helsinki University",
        url: "fullstackopen.com",
        likes: 999,
        user: loginUser.id
      };
  
      await api
        .post("/api/blogs")
        .send(newBlog)
        .expect(401)
    });
  });

  describe("viewing a specific blog", () => {
    test("a specific blog can be viewed", async () => {
      const blogsAtStart = await helper.blogsInDb();

      const blogToView = blogsAtStart[0];

      const resultBlog = await api
        .get(`/api/blogs/${blogToView.id}`)
        .expect(200)
        .expect("Content-Type", /application\/json/);

      assert.deepStrictEqual(resultBlog.body, blogToView);
    });
  });

  describe("deletion of a blog", () => {
    test("a blog can be deleted", async () => {
      const blogsAtStart = await helper.blogsInDb();
      
      const user = await User.findById(loginUser.body.id).populate('blogs');
      if (!user) {
        console.log("No user found.");
        return;
      }
  
      const userBlogs = user.blogs;
      if (userBlogs.length === 0) {
        console.log("No blogs found for this user.");
        return;
      }
  
      const blogToDelete = userBlogs[0];
  
      console.log("id blog to delete:", blogToDelete.id);
  
      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .set('Authorization', token)
        .expect(204);
  
      const blogsAtEnd = await helper.blogsInDb();
  
      const titles = blogsAtEnd.map((r) => r.title);
      assert(!titles.includes(blogToDelete.title));
  
      assert.strictEqual(blogsAtEnd.length, blogsAtStart.length - 1);
    });

    test("deletion fails if authorization token is not provided", async () => {
      const blogsAtStart = await helper.blogsInDb();
      const blogToDelete = blogsAtStart[0];
  
      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(401);
  
      const blogsAtEnd = await helper.blogsInDb();
  
      assert.strictEqual(blogsAtEnd.length, blogsAtStart.length);
    });
  });
  

  describe('updating a blog', () => {
    test('likes on a blog can be updated', async () => {
      const blogsAtStart = await helper.blogsInDb()
      let blogToUpdate = blogsAtStart[0]
  
      blogToUpdate = { ...blogToUpdate, likes: blogToUpdate.likes + 1 }
  
      await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(blogToUpdate)
        .expect(200)
  
      const blogsAtEnd = await helper.blogsInDb()
      const updatedBlog = blogsAtEnd.find(blog => blog.id === blogToUpdate.id)
  
      assert.strictEqual(updatedBlog.likes, blogToUpdate.likes)
    })
  })
  
});

after(async () => {
  await mongoose.connection.close();
});