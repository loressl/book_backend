const repository = require('../repositories/povCharacter-repository')
const bookRepo = require('../repositories/book-repository')

exports.getPovCharacter = async(req, res, next)=>{
    try {
        var name = req.body.name
        var data = await repository.getPovCharacterByName(name)
        if(!data){
            res.status(404).send({mensagem:"Este personagem não encontra-se na base de dados."})
        }
        res.status(200).send({data: data})
    } catch (error) {
        returnError500(res)
    }
}

exports.getAllBooksOfPovCharacter = async(req, res, next) =>{
    try {
        var name = req.body.name
        var data = await repository.getPovCharacterByName(name)
        var books= []
        for(var i in data.books){
            var book = await bookRepo.getBookById(data.books[i])
            books.push(book)
        }
        for(var i in data.povBooks){
            var book = await bookRepo.getBookById(data.povBooks[i])
            books.push(book)
        }
        if(books.length === 0){
            res.status(404).send({mensagem: "Este personagem não tem relação com nenhum dos livros da base de dados."})
        }
        res.status(200).send({books})
    } catch (error) {
        res.status(500).send({
            message: "Falha ao processar sua requisição!!"
        })
    }
}

exports.getAllPovCharacters = async(req, res, next)=>{
    try {
        var data = await repository.getAllPovCharacters()
        if(!data){
            res.status(404).send({mensagem:"Não tem persongens na base de dados."})
        }
        res.status(200).send({data:data})
    } catch (error) {
        res.status(500).send({
            message: "Falha ao processar sua requisição!!"
        })
    }
}