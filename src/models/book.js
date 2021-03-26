const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    name: {
        type: String,
        trim: true       
    },
    isbn:{
        type: String,
        trim: true
    },
    authors:[{
        type: String,
    }],
    numberOfPages:{
        type: Number,
    },
    publisher:{
        type: String,
    },
    country:{
        type: String,
    },
    mediaType:{
        type: String, 
    },
    released:{
        type: String, 
    },
    characters:[{
        type: String,
        required: true
    }]
});

module.exports = mongoose.model('Book', schema)