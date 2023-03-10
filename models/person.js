const mongoose = require('mongoose')

const url = process.env.MONGODB_URL

mongoose.set('strictQuery', false)

console.log('coneccting to', url)

mongoose.connect(url)
  .then(() => {
    console.log('connect to mongoDB')
  })
  .catch(error => {
    console.log('error connecting to MongoDB', error.message)
  })

const checkLength = (val) => {
  return val.length > 8 && val.length < 17
}

const checkUniqueDash = (val) => {
  const array = []

  for (let a of val) {
    if (a === '-') array.push(1)
  }

  return array.length === 1
}

const chackDashPosition = (val) => {
  const index = val.indexOf('-')
  return index === 2 || index === 3
}

const checkingForNumbers = (val) => {
  const arrayNumber = Array.from(val).filter(a => Number(a) || a === '0')
  return val.length - 1 === arrayNumber.length
}
const validators = [
  { validator: checkLength, msg: props => `The length of the ${props.value} must be from 7 to 16 sings` },
  { validator: checkUniqueDash, msg: 'The number must have a unique character "-"' },
  { validator: chackDashPosition, msg: 'position "-" must be 2-3' },
  { validator: checkingForNumbers, msg: 'The number must have a only number digits and "-"' },
]

const contactShame = new mongoose.Schema({
  number: {
    type: String,
    validate: validators,
  },
  name: {
    type: String,
    minLength: 3,
    required: true
  },
})

contactShame.set('toJSON', {
  transform: (document, returnObject) => {
    returnObject.id = returnObject._id.toString()
    delete returnObject._id
    delete returnObject.__v
  }
})

module.exports = mongoose.model('Contant', contactShame)