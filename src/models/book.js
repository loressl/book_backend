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
    povCharacters:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PovCharacter'
    }],
});

module.exports = mongoose.model('Book', schema)