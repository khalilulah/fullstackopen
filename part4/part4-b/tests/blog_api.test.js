const { test, after, beforeEach } = require("node:test");
const mongoose = require("mongoose");
const supertest = require("supertest");
const assert = require("node:assert");
const app = require("../app");
const BlogTest = require("../models/person");
const helper = require("./test_helper");

const api = supertest(app);

beforeEach(async () => {
  await BlogTest.deleteMany({});
  let blogObject = new BlogTest(helper.initialBlog[0]);
  await blogObject.save();
  blogObject = new BlogTest(helper.initialBlog[1]);
  await blogObject.save();
});

test.only("get all", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);

  const notesAtEnd = await helper.notesInDb();
  assert.strictEqual(notesAtEnd.length, helper.initialBlog.length);
  const title = notesAtEnd.map((blog) => blog.title);
  assert(title.includes("First blog"));
});

test.only("check id", async () => {
  const result = await helper.correctId();

  console.log(`this is it :${result}`);
  assert.strictEqual(true, result);
});

test.only("check blog creation", async () => {
  const newBlog = {
    title: "Sngfeqb",
    author: "vWAEv",
    url: "hqevrkdwk",
    likes: 320,
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const result = await helper.notesInDb();

  console.log(`this is it :${result}`);
  assert.strictEqual(result.length, helper.initialBlog.length + 1);
});

test.only("check likes creation", async () => {
  const newBlog = {
    title: "Sngfeqb",
    author: "vWAEv",
    url: "hqevrkdwk",
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const result = await helper.notesInDb();

  const createdBlog = result[result.length - 1];
  console.log("this is it :", createdBlog);
  assert.strictEqual(createdBlog.likes, 0);
});

test("blog without title is not added", async () => {
  const newBlog = {
    author: "Khalil",
    url: "https://example.com",
    likes: 10,
  };

  await api.post("/api/blogs").send(newBlog).expect(400);

  const blogsAtEnd = await helper.notesInDb();
  assert.strictEqual(blogsAtEnd.length, helper.initialBlog.length);
});

test("blog without url is not added", async () => {
  const newBlog = {
    author: "Khalil",
    title: "No URL blog",
    likes: 10,
  };

  await api.post("/api/blogs").send(newBlog).expect(400);

  const blogsAtEnd = await helper.notesInDb();
  assert.strictEqual(blogsAtEnd.length, helper.initialBlog.length);
});

after(async () => {
  await mongoose.connection.close();
});
