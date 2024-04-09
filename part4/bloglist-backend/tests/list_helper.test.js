const { test, describe } = require('node:test');
const assert = require('node:assert');
const listHelper = require('../utils/list_helper');

const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
    likes: 5,
    __v: 0
  }
];

const blogs = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f1',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f2',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0
  },
];

describe('dummy', () => {
  test('dummy returns one', () => {
    const result = listHelper.dummy([]);
    assert.strictEqual(result, 1);
  });
});

describe('total likes', () => {
  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog);
    assert.strictEqual(result, 5);
  });

  test('when list has multiple blogs, returns the sum of likes', () => {
    const result = listHelper.totalLikes(blogs);
    assert.strictEqual(result, 27);
  });
});

describe('favorite blog', () => {
  test('returns the blog with the most likes', () => {
    const result = listHelper.favoriteBlog(blogs);
    assert.deepStrictEqual(result, blogs[1]);
  });
});

describe('most blogs', () => {
  test('returns the author with the most blogs and their count', () => {
    const result = listHelper.mostBlogs(blogs);
    assert.deepStrictEqual(result, { author: 'Edsger W. Dijkstra', blogs: 2 });
  });
});

describe('most likes', () => {
  test('returns the author with the most total likes and their count', () => {
    const result = listHelper.mostLikes(blogs);
    assert.deepStrictEqual(result, { author: 'Edsger W. Dijkstra', likes: 17 });
  });
});
