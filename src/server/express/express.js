const express = require('express')
const cors = require('cors')

const mongoConnect = require('../mongo/mongo')
const { PORT } = require('../config')
const scooterRouter = require('./routes/scootersRoute')

const app = express()

app.use(express.json())
app.use(cors())


app.use('/scooters', scooterRouter)


try {
    app.listen(PORT, () => console.log(`Сервер запущен на порту ${PORT}`))
    mongoConnect()
} catch(e) {
    console.log('Ошибка сервера', e)
}