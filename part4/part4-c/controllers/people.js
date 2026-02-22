const blogsRouter = require("express").Router();

const BlogTest = require("../models/person");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const getTokenFrom = (request) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    return authorization.replace("Bearer ", "");
  }
  return null;
};

blogsRouter.get("/", async (request, response) => {
  const blogs = await BlogTest.find({});
  return response.json(blogs);
});

blogsRouter.post("/", async (request, response) => {
  const blog = request.body;

  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: "token invalid" });
  }
  const user = await User.findById(decodedToken.id);

  if (!user) {
    return response.status(400).json({ error: "userId missing or not valid" });
  }
  console.log(blog);

  if (!blog.title || !blog.url) {
    return response.status(400).json({ error: "content missing" });
  }

  const likes = blog.likes ? blog.likes : 0;

  const newBlog = new BlogTest({
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes,
    user: user.id,
  });

  const result = await newBlog.save();
  user.blogs = user.blogs.concat(result.id);
  await user.save();
  return response.status(201).json(result);
});

blogsRouter.delete("/:id", async (request, response) => {
  await BlogTest.findByIdAndDelete(request.params.id);

  return response.status(204).end();
});

blogsRouter.put("/:id", async (request, response) => {
  const { title, author, url, likes } = request.body;

  const blog = await BlogTest.findById(request.params.id);

  if (!blog) {
    return response.status(404).end();
  }

  blog.author = author;
  blog.title = title;
  blog.url = url;
  blog.likes = likes;

  const updatedBlog = await blog.save();

  return response.json(updatedBlog);
});

module.exports = blogsRouter;
