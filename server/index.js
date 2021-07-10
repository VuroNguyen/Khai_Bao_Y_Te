require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const getUserMail = require('./routes/user')
const medicalForm = require('./routes/medicalform')

const connectDB = async () => {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@khaibaoyte.i0oou.mongodb.net/khaibaoyte?retryWrites=true&w=majority`, {
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        })

        console.log('MongoDB connected')
    } catch (error) {
        console.log(error.message)
        process.exit(1)
    }
}

connectDB()

const app = express()

app.use(express.json())
app.use(cors())

app.use('/home', getUserMail)
app.use('/api/khaibao', medicalForm)

app.get('/', (req,res) => res.send('Hello anh em!!'))

const PORT = 5000

app.listen(PORT, () => console.log('Server started at port ' + PORT))