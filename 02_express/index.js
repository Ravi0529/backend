import 'dotenv/config'
import express from 'express';
import logger from "./logger.js";
import morgan from "morgan";

const morganFormat = ":method :url :status :response-time ms";
const app = express()
const port = process.env.PORT || 3000

app.use(
  morgan(morganFormat, {
    stream: {
      write: (message) => {
        const logObject = {
          method: message.split(" ")[0],
          url: message.split(" ")[1],
          status: message.split(" ")[2],
          responseTime: message.split(" ")[3],
        };
        logger.info(JSON.stringify(logObject));
      },
    },
  })
);

app.use(express.json())

let teaData = []
let nextId = 1

// adding teas
app.post('/teas', (req, res) => {
  const { name, price } = req.body
  const newTea = { id: nextId++, name, price }
  teaData.push(newTea)
  logger.info("This is an info message");
  res.status(200).send(newTea)
})

// viewing all teas
app.get('/teas', (req, res) => {
  logger.info("This is an info message");
  res.status(200).send(teaData)
})

// viewing particular tea through id
app.get('/teas/:id', (req, res) => {
  const tea = teaData.find(t => t.id === parseInt(req.params.id))
  if (!tea) {
    logger.error("This is an error message");
    return res.status(404).send('Tea Not Found!')
  }
  return res.status(200).send(tea)
})

// updating a tea
app.put('/teas/:id', (req, res) => {
  const tea = teaData.find(t => t.id === parseInt(req.params.id))
  if (!tea) {
    logger.error("This is an error message");
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
    logger.error("This is an error message");
    return res.status(404).send("Not Found!")
  }
  teaData.splice(index, 1) // splice deleted for index to index+1 from the array
  return res.status(204).send('Deleted')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})