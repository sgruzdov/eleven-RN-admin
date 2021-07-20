const mongoose = require('mongoose')

const mongoConnect = async () => {
    try {
        await mongoose.connect('mongodb+srv://sergey:sergey@cluster0.xtdqw.mongodb.net/eleven?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            // useFindAndModify: false
        })

        console.log('Соединение с mongo установлено')
    } catch (e) {
        console.log('Ошибка mongo', e)
    }
}

module.exports = mongoConnect