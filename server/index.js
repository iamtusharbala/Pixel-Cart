const express = require('express')
const connectDB = require('./connect')
const userRoutes = require('./routes/userRoutes')
const adminRoutes = require('./routes/adminRoutes')
const orderRoutes = require('./routes/orderRoutes')
const isAuth = require('./middlewares/isAuth')
const cors = require('cors')


const app = express()

app.use(express.json())

const PORT = 3000

// Connect to DB
connectDB()

app.use(cors())

app.use('/api/auth', userRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/orders', orderRoutes)

// Custom Middlewares
app.use(isAuth)


app.listen(PORT, () => {
    console.log(`App running on port ${PORT}..`);
})