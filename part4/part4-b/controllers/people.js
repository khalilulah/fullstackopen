const blogsRouter = require("express").Router();

const BlogTest = require("../models/person");

blogsRouter.get("/", async (request, response) => {
  const blogs = await BlogTest.find({});
  return response.json(blogs);
});

blogsRouter.post("/", async (request, response) => {
  const blog = BlogTest(request.body);
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
  });

  const result = await newBlog.save();
  return response.status(201).json(result);
});

module.exports = blogsRouter;
