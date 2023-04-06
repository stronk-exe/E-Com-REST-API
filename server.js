const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const userRoute = require('./routes/user')
const authRoute = require('./routes/auth')
const poductRoute = require('./routes/product')
const cartRoute = require('./routes/cart')
const orderRoute = require('./routes/order')

dotenv.config()

mongoose.connect(process.env.MONGO_URL)
.then(() => console.log('Database connection successfull!'))
.catch((err) => {
	console.log(err)
})

app.use('/api/auth', authRoute)
app.use('/api/user', userRoute)
app.use('/api/products', poductRoute)
app.use('/api/cart', cartRoute)
app.use('/api/order', orderRoute)

app.listen(process.env.PORT || 5000, () => {
	console.log('listining on 5000..')
})