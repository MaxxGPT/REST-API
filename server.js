require('dotenv').config()

const express = require('express') 
const app = express()
const mongoose = require('mongoose')


mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true , useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

app.use(express.json())

const articlesRouter = require('./routes/articles')
app.use('/articles', articlesRouter)

const userRouter = require('./routes/users')
app.use('/users', userRouter)

app.set('view-engine', 'ejs')
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
    res.render('index.ejs')
})

app.get('/login', (req, res) => {
    res.render('login.ejs')
})

app.post('/login', (req, res) => {

})

app.get('/register', (req, res) => {
    res.render('register.ejs')
})

app.listen(3000, () => console.log('Server Started'))