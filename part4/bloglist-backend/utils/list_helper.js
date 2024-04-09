const dummy = (blogs) => {return 1;};

const totalLikes = (blogs) => {return blogs.reduce((sum, blog) => sum + blog.likes, 0);};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null;
  return blogs.reduce((max, blog) => (max.likes > blog.likes ? max : blog));
};

const mostBlogs = (blogs) => {
  const blogCounts = {};

  blogs.forEach((blog) => {blogCounts[blog.author] = (blogCounts[blog.author] || 0) + 1;});

  let authorWithMostBlogs;
  let maxBlogs = -1;
  for (const author in blogCounts) {
    if (blogCounts[author] > maxBlogs) {
      authorWithMostBlogs = author;
      maxBlogs = blogCounts[author];
    }
  }
  return { author: authorWithMostBlogs, blogs: maxBlogs };
};

const mostLikes = (blogs) => {
  const authorLikes = {};
  blogs.forEach((blog) => {authorLikes[blog.author] = (authorLikes[blog.author] || 0) + blog.likes;});
  const authorWithMostLikes = Object.keys(authorLikes).reduce((a, b) =>authorLikes[a] > authorLikes[b] ? a : b);
  return { author: authorWithMostLikes, likes: authorLikes[authorWithMostLikes] };
};

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes };