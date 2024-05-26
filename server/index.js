const express = require('express')
const connectDB = require('./connect')
const userRoutes = require('./routes/userRoutes')
const isAuth = require('./middlewares/isAuth')


const app = express()

app.use(express.json())

const PORT = 3000

// Connect to DB
connectDB()

app.use('/api/auth', userRoutes)

// Custom Middlewares
app.use(isAuth)


app.listen(PORT, () => {
    console.log(`App running on port ${PORT}..`);
})