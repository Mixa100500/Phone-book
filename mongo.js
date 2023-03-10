const mongoose = require('mongoose')
require('dotenv').config()

const Contact = require('./models/person')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

if (process.argv.length < 4) {
  Contact.find({}).then(result => {
    console.log('phonebook:')
    result.forEach(c => {
      console.log(c.number, c.name)
    })
    mongoose.connection.close()
  })
} else {
  const name = process.argv[3]
  const number = process.argv[4]

  const contact = new Contact({
    number,
    name,
  })

  contact.save().then(() => {
    console.log(`added  ${name} namber ${number} to phonebook`)
    mongoose.connection.close()
  })
}