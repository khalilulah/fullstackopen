const { test, after, beforeEach } = require("node:test");
const mongoose = require("mongoose");
const supertest = require("supertest");
const assert = require("node:assert");
const app = require("../app");
const BlogTest = require("../models/person");
const jwt = require("jsonwebtoken");
const helper = require("./test_helper");
const User = require("../models/user");
const bcrypt = require("bcryptjs");

const api = supertest(app);

let token;

beforeEach(async () => {
  await User.deleteMany({});
  await BlogTest.deleteMany({});

  const passwordHash = await bcrypt.hash("sekret", 10);
  const user = await new User({
    username: "mojo",
    passwordHash,
  }).save();

  const userForToken = {
    username: user.username,
    id: user._id,
  };

  token = jwt.sign(userForToken, process.env.SECRET);
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
  const blogsAtStart = await await BlogTest.find({});

  await api
    .post("/api/blogs")
    .set("Authorization", `Bearer ${token}`)
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const blogsAtEnd = await helper.notesInDb();
  assert.strictEqual(blogsAtEnd.length, blogsAtStart.length + 1);
});

test.only("check creation without wrong token", async () => {
  const newBlog = {
    title: "Sngfeqb",
    author: "vWAEv",
    url: "hqevrkdwk",
    likes: 320,
  };
  const blogsAtStart = await await BlogTest.find({});

  await api
    .post("/api/blogs")
    .set("Authorization", "Bearer gxfchchgch")
    .send(newBlog)
    .expect(401)
    .expect("Content-Type", /application\/json/);

  const blogsAtEnd = await helper.notesInDb();
  assert.strictEqual(blogsAtEnd.length, blogsAtStart.length);
});

test.only("check likes creation", async () => {
  const newBlog = {
    title: "Sngfeqb",
    author: "vWAEv",
    url: "hqevrkdwk",
  };

  await api
    .post("/api/blogs")
    .set("Authorization", `Bearer ${token}`)
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

  await api
    .post("/api/blogs")
    .set("Authorization", `Bearer ${token}`)
    .send(newBlog)
    .expect(400);

  const blogsAtEnd = await helper.notesInDb();
  assert.strictEqual(blogsAtEnd.length, helper.initialBlog.length);
});

test("blog without url is not added", async () => {
  const newBlog = {
    author: "Khalil",
    title: "No URL blog",
    likes: 10,
  };

  await api
    .post("/api/blogs")
    .set("Authorization", `Bearer ${token}`)
    .send(newBlog)
    .expect(400);

  const blogsAtEnd = await helper.notesInDb();
  assert.strictEqual(blogsAtEnd.length, helper.initialBlog.length);
});

test("a blog can be deleted", async () => {
  const blogsAtStart = await helper.notesInDb();
  const blogToDelete = blogsAtStart[0];

  await api
    .set("Authorization", `Bearer ${token}`)
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204);

  const blogsAtEnd = await helper.notesInDb();

  const ids = blogsAtEnd.map((n) => n.id);
  assert(!ids.includes(blogToDelete.id));

  assert.strictEqual(blogsAtEnd.length, helper.initialBlog.length - 1);
});

test("a blog can be updated", async () => {
  const blogsAtStart = await helper.notesInDb();
  const blogToUpdate = blogsAtStart[0];
  const updatedData = {
    ...blogToUpdate,
    likes: 999,
  };

  await api
    .set("Authorization", `Bearer ${token}`)
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(updatedData);

  const blogsAtEnd = await helper.notesInDb();
  const updatedBlog = blogsAtEnd.find((b) => b.id === blogToUpdate.id);

  assert.strictEqual(updatedBlog.likes, 999);
});

after(async () => {
  await mongoose.connection.close();
});
