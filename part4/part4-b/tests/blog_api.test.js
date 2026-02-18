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

after(async () => {
  await mongoose.connection.close();
});
