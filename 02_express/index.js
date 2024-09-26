import express from 'express';

const app = express()
const port = 3000

app.use(express.json())

let teaData = []
let nextId = 1

// adding teas
app.post('/teas', (req, res) => {
  const { name, price } = req.body
  const newTea = { id: nextId++, name, price }
  teaData.push(newTea)
  res.status(200).send(newTea)
})

// viewing all teas
app.get('/teas', (req, res) => {
  res.status(200).send(teaData)
})

// viewing particular tea through id
app.get('/teas/:id', (req, res) => {
  const tea = teaData.find(t => t.id === parseInt(req.params.id))
  if (!tea) {
    return res.status(404).send('Tea Not Found!')
  }
  return res.status(200).send(tea)
})

// updating a tea
app.put('/teas/:id', (req, res) => {
  const tea = teaData.find(t => t.id === parseInt(req.params.id))
  if (!tea) {
    return res.status(404).send('Tea Not Found!')
  }
  const { name, price } = req.body
  tea.name = name
  tea.price = price
  res.status(200).send(tea)
})

// deleting a tea
app.delete('/teas/:id', (req, res) => {
  const index = teaData.findIndex(t => t.id === parseInt(req.params.id))
  if (index === -1) {
    return res.status(404).send("Not Found!")
  }
  teaData.splice(index, 1) // splice deleted for index to index+1 from the array
  return res.status(204).send('Deleted')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})