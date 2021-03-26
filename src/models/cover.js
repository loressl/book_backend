const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    book:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book'
    },
    cover:{
        type:String
    }
});

module.exports = mongoose.model('Cover', schema)