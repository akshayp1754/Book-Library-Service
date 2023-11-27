const express = require('express')
const dotenv = require('dotenv')
dotenv.config()
const app = express()
const PORT = process.env.PORT || 3000
const { connectDB } = require('./utils/db')
const bookRoute = require('./routes/books')
const authorRoute = require('./routes/auth')
const borrowRoute = require('./routes/borrow')

connectDB()
app.use(express.json())

app.use("/books", bookRoute)
app.use("/auth", authorRoute)
app.use("/borrow", borrowRoute)

app.get('/welcome', (req, res) => {
  res.send('Hare Krishna!')
})


app.listen(PORT, () => {
  console.log(`App listening on ${PORT}`)
})