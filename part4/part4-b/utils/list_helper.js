const dummy = (blogs) => {
  console.log(blogs);

  return 1;
};

const totalLikes = (blog) => {
  const reducer = (sum, blog) => {
    return sum + blog.likes;
  };
  return blog.reduce(reducer, 0);
};

const favourite = (blog) => {
  if (blog.length === 0) {
    return null; // or undefined, depending on requirements
  }
  let currentHighest = 0;
  let currentHighestIndex = blog[0];
  for (let index = 0; index < blog.length; index++) {
    const element = blog[index].likes;

    if (element > currentHighest) {
      currentHighest = element;
      currentHighestIndex = blog[index];
    }
  }
  console.log(currentHighestIndex);

  return currentHighestIndex;
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }

  // Count blogs per author
  const authorCounts = {};

  for (let i = 0; i < blogs.length; i++) {
    const author = blogs[i].author;

    if (authorCounts[author]) {
      authorCounts[author]++;
    } else {
      authorCounts[author] = 1;
    }
  }

  // Find author with most blogs
  let maxAuthor = { author: "", blogs: 0 };

  for (const author in authorCounts) {
    if (authorCounts[author] > maxAuthor.blogs) {
      maxAuthor = { author: author, blogs: authorCounts[author] };
    }
  }

  return maxAuthor;
};

const mostLikes = (blog) => {
  if (blog.length === 0) {
    return null;
  }

  // Count likes per author
  const authorLikes = {};

  for (let i = 0; i < blog.length; i++) {
    const author = blog[i].author;

    if (authorLikes[author]) {
      authorLikes[author] = authorLikes[author] + blog[i].likes;
    } else {
      authorLikes[author] = blog[i].likes;
    }
    console.log(authorLikes);
  }

  // Find author with most likes
  let maxAuthor = { author: "", likes: 0 };

  for (const author in authorLikes) {
    if (authorLikes[author] > maxAuthor.likes) {
      maxAuthor = { author: author, likes: authorLikes[author] };
    }
  }

  return maxAuthor;
};

module.exports = {
  dummy,
  totalLikes,
  favourite,
  mostBlogs,
  mostLikes,
};
