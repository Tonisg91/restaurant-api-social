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

app.listen(PORT, () => {
    console.log('Listen at port: ', PORT)
})
