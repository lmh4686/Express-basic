import express from 'express'
import { CategoryModel } from './db.js'
import entryRoutes from './routes/entry_routes.js'
// For cross-origin error
import cors from 'cors'

const app = express()
// Open for everyone
app.use(cors())

//Search json from request.body and parse as json if none, ignored
app.use(express.json())

app.get('/', (request, response) => response.send({ info: 'Journal API 2023' }))

app.get('/categories', async (req, res) => res.send(await CategoryModel.find()))

app.use('/entries', entryRoutes)

export default app