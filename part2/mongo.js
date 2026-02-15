const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const personName = process.argv[3]
const personNumber = process.argv[4]

const url = `mongodb+srv://alausakhalil:${password}@cluster0.7vvem.mongodb.net/?appName=Cluster0`

mongoose.set('strictQuery', false)

mongoose.connect(url, { family: 4 })

const noteSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', noteSchema)

if (process.argv.length === 3) {
  Person.find({}).then((result) => {
    result.forEach((note) => {
      console.log(note)
    })
    mongoose.connection.close()
  })
} else {
  const person = new Person({
    name: personName,
    number: personNumber,
  })

  person.save().then((result) => {
    console.log(`Added ${personName} number ${personNumber} to phonebook`)
    mongoose.connection.close()
  })
}
