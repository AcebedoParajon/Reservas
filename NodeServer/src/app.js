const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')


const app = express()

app.use(morgan('dev'))
app.use(express.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())
app.use(require('./routes'))



app.listen(process.env.PORT || 8081)