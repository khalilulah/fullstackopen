const { test, after, beforeEach } = require("node:test");
const mongoose = require("mongoose");
const supertest = require("supertest");
const assert = require("node:assert");
const app = require("../app");
const BlogTest = require("../models/person");

const api = supertest(app);

const initialBlog = [
  {
    title: "Sng",
    author: "Stig",
    url: "hqkdwk",
    likes: 10,
  },
  {
    title: "First blog",
    author: "Khalil",
    url: "hqkdwk",
    likes: 5,
  },
];

beforeEach(async () => {
  await BlogTest.deleteMany({});
  let blogObject = new BlogTest(initialBlog[0]);
  await blogObject.save();
  blogObject = new BlogTest(initialBlog[1]);
  await blogObject.save();
});

test.only("get all", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
  const response = await api.get("/api/blogs");
  const title = response.body.map((blog) => blog.title);
  assert.strictEqual(response.body.length, initialBlog.length);
  assert(title.includes("First blog"));
});

after(async () => {
  await mongoose.connection.close();
});
