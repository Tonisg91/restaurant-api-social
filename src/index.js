require('dotenv').config()
require('./config/db')
require('./components/Users/routes')

const express = require('express')
const cors = require('cors')
const logger = require('morgan')

const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(
    cors({
        origin: '*',
        credentials: true
    })
)
app.use(express.urlencoded({ extended: false }))
app.use(logger('dev'))

const userRoutes = require('./components/Users/routes')
const companyRoutes = require('./components/Companies/routes')

app.use('/api/users', userRoutes)
app.use('/api/companies', companyRoutes)

app.listen(PORT, () => {
    console.log('Listen at port: ', PORT)
})
