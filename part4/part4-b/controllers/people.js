const blogsRouter = require("express").Router();

const BlogTest = require("../models/person");

blogsRouter.get("/", async (request, response) => {
  const blogs = await BlogTest.find({});
  return response.json(blogs);
});

blogsRouter.post("/", async (request, response) => {
  const blog = new BlogTest(request.body);
  const result = await blog.save();
  return response.status(201).json(result);
});

module.exports = blogsRouter;
