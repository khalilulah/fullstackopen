const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Person = require("./models/person");
const errorHandler = require("./errorHandler");
var morgan = require("morgan");

const app = express();
app.use(express.static("dist"));
dotenv.config();
app.use(cors());
app.use(express.json());

morgan.token("body", (req) => JSON.stringify(req.body));

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body"),
);

// let persons = [
//   {
//     id: "1",
//     name: "Arto Hellas",
//     number: "040-123456",
//   },
//   {
//     id: "2",
//     name: "Ada Lovelace",
//     number: "39-44-5323523",
//   },
//   {
//     id: "3",
//     name: "Dan Abramov",
//     number: "12-43-234345",
//   },
//   {
//     id: "4",
//     name: "Mary Poppendieck",
//     number: "39-23-6423122",
//   },
// ];

// MONGODB SECTION

// if (process.argv.length < 3) {
//   console.log("give password as argument");
//   process.exit(1);
// }

// const password = process.argv[2];
// console.log(password);

// const personName = process.argv[4];
// const personNumber = process.argv[5];

// const url = `mongodb+srv://alausakhalil:${password}@cluster0.7vvem.mongodb.net/?appName=Cluster0`;

// mongoose.set("strictQuery", false);

// mongoose.connect(url, { family: 4 });

// const noteSchema = new mongoose.Schema({
//   name: String,
//   number: String,
// });

// noteSchema.set("toJSON", {
//   transform: (document, returnedObject) => {
//     returnedObject.id = returnedObject._id.toString();
//     delete returnedObject._id;
//     delete returnedObject.__v;
//   },
// });
// const Person = mongoose.model("Person", noteSchema);

app.get("/info", (request, response) => {
  const date = new Date().toString();
  response.send(`<p>phonebook has info for ${persons.length} people</p>
    <p>${date}</p>`);
});

app.get("/api/persons/:id", (request, response, next) => {
  Person.findById(request.params.id)
    .then((person) => {
      if (person) {
        response.json(person);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

//delete a person from phonebooonk
app.delete("/api/persons/:id", (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then((result) => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

//get all persons in phonebook
app.get("/api/persons", (request, response) => {
  Person.find({}).then((result) => {
    console.log(result);
    response.json(result);

    mongoose.connection.close();
  });
});

//create a new phonebook
app.post("/api/persons", (request, response) => {
  // const generateId = Math.floor(Math.random() * 1002829);
  const body = request.body;

  if (!body.name || !body.number) {
    return response.status(400).json({ error: "content missing" });
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person.save().then((savedPerson) => {
    response.json(savedPerson);
  });

  // const existingName = persons.find(
  //   (person) => person.name.toLowerCase() === body.name.toLowerCase(),
  // );
  // console.log(existingName);

  // if (existingName) {
  //   return response.status(400).json({
  //     error: "name must be unique",
  //   });
  // }

  // if (!body.name || !body.number) {
  //   return response.status(400).json({
  //     error: "fill all fields",
  //   });
  // }

  // const person = {
  //   id: generateId,
  //   name: body.name,
  //   number: body.number,
  // };
  // persons.push(person);
  // console.log(person);

  // response.json(person);
});

//update user's number
app.put("/api/persons/:id", (request, response, next) => {
  const { name, number } = request.body;

  Person.findById(request.params.id)
    .then((person) => {
      if (!person) {
        return response.status(404).end();
      }

      person.name = name;
      person.number = number;

      return person.save().then((updatedPerson) => {
        response.json(updatedPerson);
      });
    })
    .catch((error) => next(error));
});

app.use(errorHandler);
const PORT = process.env.PORT || 3001;
console.log(PORT);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
