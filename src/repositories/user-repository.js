const mongoose = require('mongoose')
const User = mongoose.model('User')

exports.create = async (data) => {
    var user = new User(data)
    return await user.save()
}

exports.authenticate = async (username, password) => {
    return await User.findOne(
        {username: username,
        password : password})
}

exports.getByUsername = async (username) => {
    return await User.findOne({ username: username })
}

