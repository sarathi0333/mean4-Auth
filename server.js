require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require('passport');

const app = express();

const userRoutes = require('./routes/users')

//Database Connection 
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE, { useMongoClient: true });
mongoose.connection.on('connected', () => {
    console.log('DB connection established');
});
mongoose.connection.on('error', (err) => {
    console.log(`unable to connect to DB ${err}`);
});

// ------ Middleware -------------//
//CORS
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);
// ------ Middleware -------------//

// Angular public output folder
app.use(express.static(path.join(__dirname, 'public')));

//routes
app.use('/users', userRoutes);

//Set Port
const port = process.env.PORT || '3000';
app.listen(port, () => {
    console.log(`server running in port ${port}`);
})
