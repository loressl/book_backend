const mongoose = require('mongoose')
const User = mongoose.model('User')

exports.create = async (data) => {
    var user = new User(data)
    return await user.save()
}

exports.authenticate = async (username, password) => {
    return await User.findOne({username: username}, function(err, user){
        if(err) throw err
        user.verifyPassword(password, function(err, isMatch){
            if(err) throw err
        })
    })
}

exports.getByUsername = async (username) => {
    return await User.findOne({ username: username })
}

