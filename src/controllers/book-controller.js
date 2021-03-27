const repository = require('../repositories/book-repository')
const povCharacterRepo = require('../repositories/povCharacter-repository')
const imageToBase64 = require('image-to-base64')
var apiCovers = 'http://covers.openlibrary.org/b/isbn/'

exports.getPovCharacteresOfBook = async (req, res, next) => {
    try {
        var nameBook = req.body.name
        var book = await repository.getBookByName(nameBook)
        var povCharacters = []
        for (var i in book.povCharacters) {
            var bdCharacter = await povCharacterRepo.getPovCharacterById(book.povCharacters[i])
            povCharacters.push(bdCharacter)
        }
        if (povCharacters.length === 0) {
            res.status(404).send({ mensagem: "Este livro não tem personagens principais." })
        }
        res.status(200).send(povCharacters)
    } catch (e) {
        res.status(500).send({
            message: "Falha ao processar sua requisição!!"
        })
    }
}

exports.getCoverOfBook = async (req, res, next) => {
    try {
        var nameBook = req.body.name
        var book = await repository.getBookByName(nameBook)
        var cover = await imageToBase64(`${apiCovers}${book.isbn.concat('.jpg')}`).catch(err => {
            console.log(err)
        })
        if (!cover) {
            res.status(404).send({ mensagem: "Este livro não tem capa." })
        }
        res.status(200).send({ data: cover })
    } catch (error) {
        res.status(500).send({
            message: "Falha ao processar sua requisição!!"
        })
    }
}

exports.getAllBooks = async (req, res, next) => {
    try {
        var data = await repository.getAllBooks()
        if (data.length === 0) {
            res.status(404).send({ mensagem: "Não há livro na base de dados!" })
        }
        res.status(200).send({ data: data })
    } catch (error) {
        res.status(500).send({
            message: "Falha ao processar sua requisição!!"
        })
    }
}