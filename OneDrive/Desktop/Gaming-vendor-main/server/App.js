const path = require('path');
const express = require('express')
const app = express()
const cors = require("cors");
const dotenv = require("dotenv")
const connectDB = require('./config/db')
const authRoute = require('./routes/auth.route');
const profileRoute = require('./routes/profile.route');
const port = process.env.PORT || 5000

dotenv.config({ path: path.resolve(__dirname, '../.env') });

app.use(express.json())

app.use(cors());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: false }));

app.use('/api/auth',authRoute)
// app.use('/api/profile',profileRoute)

connectDB() //DB connection

app.listen(port,()=>{
    console.log(`Server is running on PORT Number: ${port}!!!`);
})