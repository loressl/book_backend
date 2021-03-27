const mongoose = require('mongoose');
const book = require('../models/book')
const Book = mongoose.model('Book')

exports.create = async (data) => {
    var book = new Book(data);
    return await book.save();
}

exports.getBookByName = async (name) => {
    return await Book.findOne(
        {  name: name }
    )
}

exports.getBookById = async(id)=>{
    return await Book.findById(id)
}

exports.getAllBooks = async () => {
    return await Book.find()
}

exports.update = async (id, data) => {
    await Book.findByIdAndUpdate(id, { $set: data })
}
