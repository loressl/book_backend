const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const requireDir = require('require-dir')
require('dotenv').config()

const app = express();

mongoose.connect(process.env.MONGODB,
    {
        useCreateIndex: true,
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useFindAndModify: false
    })
    .then(() => {
        console.log("Mongodb connected ...");
    }).catch((err) => {
        console.log(err);
});

app.use(express.json({
    limit: '5mb'
}));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Habilita o CORS
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    app.use(cors());
    next();
});

requireDir('../src/models')

const extenalData = require('./api-data')
setTimeout(()=>{
    extenalData()
},2500)

app.use('/', require('./routes/index-route'));
app.use('/books', require('./routes/book-route'));
app.use('/povCharacters', require('./routes/povCharacter-route'));

module.exports = app;