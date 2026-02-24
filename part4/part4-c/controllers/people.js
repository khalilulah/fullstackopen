const blogsRouter = require("express").Router();

const BlogTest = require("../models/person");

const { userExtractor } = require("../utils/middleware");

blogsRouter.get("/", async (request, response) => {
  const blogs = await BlogTest.find({});
  return response.json(blogs);
});

blogsRouter.post("/", userExtractor, async (request, response) => {
  const blog = request.body;

  const user = request.user;

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

blogsRouter.delete("/:id", userExtractor, async (request, response) => {
  const blog = await BlogTest.findById(request.params.id);

  if (!blog) {
    return response.status(404).json({ error: "blogId missing or not valid" });
  }

  if (blog.user.toString() !== request.user.id.toString()) {
    return response.status(403).json({ error: "unauthorised access" });
  }

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
