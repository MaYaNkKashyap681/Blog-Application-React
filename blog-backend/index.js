const express = require('express')
const cookieParser = require('cookie-parser')
const app = express();
const cors = require('cors')

/* Golbal Middlewares*/
app.use(cors())
app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({extended: true}))

app.use('/auth', require('./routes/auth.js'))
// app.use('/user', require('./routes/user'))
app.use('/posts', require('./routes/posts'))

app.listen(4000, () => {
    console.log("Server is Connected!")
})