import mongoose from 'mongoose'
import dotenv from 'dotenv'

// Read and parse dot env file and add all variables to environment
dotenv.config()

//Just remove warning message
mongoose.set('strictQuery', true)

try {
  const m = await mongoose.connect(process.env.ATLAS_DB_URL)
  console.log(m.connection.readyState === 1 ? 'Mongoose connected!' : 'Mongoose failed to connect')
}
catch (err) {
  console.log(err)
}

async function dbClose() {
  await mongoose.connection.close()
  console.log("Database disconnected!")
}

// Create a Mongoose schema to define the structure of a model
const entrySchema = new mongoose.Schema({
  category: { type: mongoose.ObjectId, ref: 'Category' },
  content: { type: String, required: true }
})

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true }
})

// Create a Mongoose model based on the schema
// PascalCase, singular convention for Model name
const EntryModel = mongoose.model('Entry', entrySchema)
const CategoryModel = mongoose.model('Category', categorySchema)

export { EntryModel, CategoryModel, dbClose }