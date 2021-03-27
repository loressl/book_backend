const mongoose = require('mongoose');
const povCharacter = require('../models/povCharacter')
const PovCharacter = mongoose.model('PovCharacter')

exports.create = async (data)=>{
    var porCharacter = new PovCharacter(data)
    return await porCharacter.save()
}

exports.getPovCharacterByName = async(name)=>{
    return await PovCharacter.findOne(
        {name : name}
    )
}

exports.getPovCharacterById = async(id)=>{
    return await PovCharacter.findById(id)
}

exports.getAllPovCharacters = async()=>{
    return await PovCharacter.find()
}

exports.update = async (id, data) => {
    await PovCharacter.findByIdAndUpdate(id, { $set: data })
}
