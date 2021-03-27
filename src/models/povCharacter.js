const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    name: {
        type: String,
        trim: true       
    },
    gender:{
        type: String,
    },
    culture:{
        type: String,
    },
    born:{
        type: String,
    },
    died:{
        type: String,
    },
    titles:[{
        type: String,
    }],
    aliases:[{
        type: String, 
    }],
    father:{
        type: String, 
    },
    mother:{
        type: String, 
    },
    spouse:{
        type: String, 
    },
    books:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book'
    }],
    povBooks:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book'
    }],
    tvSeries:[{
        type: String,
    }],
    playedBy:[{
        type: String,
    }]
});

module.exports = mongoose.model('PovCharacter', schema)