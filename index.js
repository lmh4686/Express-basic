import express from 'express';

const categories = ['Food', 'Coding', "Work", 'Other']

const entries = [
    {category: 'Food', content:'Hello'},
    {category: 'Coding', content:'Express is cool'},
    {category: 'Work', content:'Another dat at work'}
]

const app = express();
const port = 4001

//Search json from request.body and parse as json if none ignored
app.use(express.json()) 

app.get('/', (request, response) => response.send({info: 'Journal API'}))

app.get('/categories', (req, res) => res.status(204).send(categories))

app.get('/entries/:id', (req, res) => {
    const entry = entries[req.params.id]
    if (entry) {
        res.send(entry)
    } else {
        res.status(404).send({ error: 'Entry not found'})
    }
    
})

app.post('/entries', (req, res) => {
    const { category, content } = req.body
    const newEntry = { category, content }
    console.log(newEntry)
    entries.push(newEntry)
    res.status(201).send(newEntry)
})

app.listen(port, () => {console.log(`App running at https://localhost:${port}`)})
