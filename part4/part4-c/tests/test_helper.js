const BlogTest = require("../models/person");
const User = require("../models/user");

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

const nonExistingId = async () => {
  const note = new BlogTest({ content: "willremovethissoon" });
  await note.save();
  await note.deleteOne();

  return note._id.toString();
};

const notesInDb = async () => {
  const notes = await BlogTest.find({});
  return notes.map((note) => note.toJSON());
};
const usersInDb = async () => {
  const users = await User.find({});
  return users.map((note) => note.toJSON());
};
const correctId = async () => {
  const blogsAtEnd = await notesInDb();
  if (blogsAtEnd.length < 1) {
    return "no blog in the list";
  }
  return blogsAtEnd[0].id !== undefined;
};

// const confirmCreation = async () => {

// }

module.exports = {
  initialBlog,
  nonExistingId,
  notesInDb,
  correctId,
  usersInDb,
};
