const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
var morgan = require("morgan");
const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());
morgan.token("body", (req) => JSON.stringify(req.body));

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body"),
);

let persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/info", (request, response) => {
  const date = new Date().toString();
  response.send(`<p>phonebook has info for ${persons.length} people</p>
    <p>${date}</p>`);
});

app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  const person = persons.find((person) => person.id === id);
  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

//delete a person from phonebooonk
app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  persons = persons.filter((person) => person.id !== id);

  response.status(204).end();
});

//get all persons in phonebook
app.get("/api/persons", (request, response) => {
  response.json(persons);
});

//create a new phonebook
app.post("/api/persons", (request, response) => {
  const generateId = Math.floor(Math.random() * 1002829);
  body = request.body;

  const existingName = persons.find(
    (person) => person.name.toLowerCase() === body.name.toLowerCase(),
  );
  console.log(existingName);

  if (existingName) {
    return response.status(400).json({
      error: "name must be unique",
    });
  }

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "fill all fields",
    });
  }

  const person = {
    id: generateId,
    name: body.name,
    number: body.number,
  };
  persons.push(person);
  console.log(person);

  response.json(person);
});

const PORT = process.env.PORT || 3001;
console.log(PORT);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
