import express from 'express'
import { EntryModel, CategoryModel } from '../db.js'

const router = express.Router()


// Retrieve all EntryModel documents when find() parm left empty
// .populate Show all info of category field instead of just showing ID.
// For multiple fields select, pass an array of fields.
router.get('/', async (req, res) => res.send(await EntryModel.find().populate({ path: 'category', select: 'name' })))

router.get('/:id', async (req, res) => {
  try {
    const entry = await EntryModel.findById(req.params.id).populate({ path: 'category', select: 'name' })
    if (entry) {
      res.send(entry)
    } else {
      res.status(404).send({ error: 'Entry not found' })
    }
  } 
  catch (err) {
    res.status(500).send({ error: err.message })
  }
})


router.put('/:id', async (req, res) => {
    const { category, content } = req.body
    const newEntry = { category, content }
    
    try {
      const entry = await EntryModel.findByIdAndUpdate(req.params.id, newEntry, { returnDocument: 'after' })
      if (entry) {
        res.send(entry)
      } else {
        res.status(404).send({ error: 'Entry not found' })
      }
    }
    catch (err) {
      res.status(500).send({ error: err.message })
    }
})

router.delete('/:id', async (req, res) => {
    try {
      const entry = await EntryModel.findByIdAndDelete(req.params.id)
      if (entry) {
        res.sendStatus(204)
      } else {
        res.status(404).send({ error: 'Entry not found' })
      }
    }
    catch (err) {
      res.status(500).send({ error: err.message })
    }
})

router.post('/', async (req, res) => {
    try {
      const { category, content } = req.body
      const categoryObject = await CategoryModel.findOne({ name: category })
      const newEntry = { category: categoryObject._id, content }
      const insertedEntry = await EntryModel.create(newEntry)
      res.status(201).send(await insertedEntry.populate({ path: 'category', select: 'name' }))
    }
    catch (err) {
      res.status(500).send({ error: err.message })
    }
  })
  
  export default router