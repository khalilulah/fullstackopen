const express = require('express')
const cors = require('cors')
// const mongoose = require('mongoose')
const dotenv = require('dotenv')
const Person = require('./models/person')
const errorHandler = require('./errorHandler')
var morgan = require('morgan')

const app = express()
app.use(cors())
app.use(express.static('dist'))
dotenv.config()
app.use(express.json())

morgan.token('body', (req) => JSON.stringify(req.body))

app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body'),
)

app.get('/info', (request, response) => {
  const date = new Date().toString()
  response.send(`<p>phonebook has info for ${Person.length} people</p>
    <p>${date}</p>`)
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then((person) => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch((error) => next(error))
})

//delete a person from phonebooonk
app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch((error) => next(error))
})

//get all persons in phonebook
app.get('/api/persons', (request, response) => {
  Person.find({}).then((result) => {
    console.log(result)
    response.json(result)
  })
})

//create a new phonebook
app.post('/api/persons', (request, response, next) => {
  // const generateId = Math.floor(Math.random() * 1002829);
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({ error: 'content missing' })
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person
    .save()
    .then((savedPerson) => {
      response.json(savedPerson)
    })
    .catch((error) => next(error))
})

//update user's number
app.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body

  Person.findById(request.params.id)
    .then((person) => {
      if (!person) {
        return response.status(404).end()
      }

      person.name = name
      person.number = number

      return person.save().then((updatedPerson) => {
        response.json(updatedPerson)
      })
    })
    .catch((error) => next(error))
})

app.use(errorHandler)
const PORT = process.env.PORT || 3001
console.log(PORT)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
