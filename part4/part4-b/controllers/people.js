const blogsRouter = require("express").Router();

const BlogTest = require("../models/person");

blogsRouter.get("/", (request, response) => {
  BlogTest.find({}).then((blogs) => {
    response.json(blogs);
  });
});

blogsRouter.post("/", (request, response) => {
  const blog = new BlogTest(request.body);

  blog.save().then((result) => {
    response.status(201).json(result);
  });
});

module.exports = blogsRouter;
