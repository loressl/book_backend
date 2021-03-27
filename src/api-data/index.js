const axios = require('axios')
const bookRepo = require('../repositories/book-repository')
const povCharacterRepo = require('../repositories/povCharacter-repository')

var apiBooks = 'https://anapioficeandfire.com/api/books/'
var apiCharacters = 'https://anapioficeandfire.com/api/characters/'


const returnBooks = async (listBooks, idBooks) => {
    var bd = []
    for (var j in listBooks) {
        var idBooksUrls = listBooks[j].split('/')
        var idBook = idBooksUrls[idBooksUrls.length - 1]
        var nameBook = undefined

        for (var obj of idBooks) {
            if (obj.id === parseInt(idBook)) {
                nameBook = obj.name
            }
        }
        if (nameBook !== undefined) {
            var book = await bookRepo.getBookByName(nameBook)
            bd.push(book._id)
        } else {
            const response = await axios.get(`${apiBooks}${idBook}`).catch(err => {
                console.log(err)
            })
            const booksData = response.data

            var book = await bookRepo.create({
                name: booksData.name,
                isbn: booksData.isbn,
                authors: booksData.authors,
                numberOfPages: booksData.numberOfPages,
                publisher: booksData.publisher,
                country: booksData.country,
                mediaType: booksData.mediaType,
                released: booksData.released,
            })
            idBooks.push({
                id: parseInt(idBook),
                name: booksData.name,
                urlPovCharacter: booksData.povCharacters
            })
            bd.push(book._id)
        }
    }
    return bd
}

const returnName = async (url) => {
    const response = await axios.get(url).catch(err => {
        console.log(err)
    })
    return response.data.name
}

const saveDataApiExternal = async () => {
    const dbBooks = await bookRepo.getAllBooks() || []
    if (dbBooks.length === 0) {
        const response = await axios.get(apiBooks).catch(err => {
            console.log(err)
        })
        const booksData = response.data
        var idBooks = []
        var idPovCharacters = []
        //livros
        for (var j in booksData) {
            idBooks.push({
                id: parseInt(j) + 1,
                name: booksData[j].name,
                urlPovCharacter: booksData[j].povCharacters
            })

            for (var i in booksData[j].povCharacters) {
                var urlSplit = booksData[j].povCharacters[i].split('/')
                idPovCharacters.push(urlSplit[urlSplit.length - 1])
            }

            await bookRepo.create({
                name: booksData[j].name,
                isbn: booksData[j].isbn,
                authors: booksData[j].authors,
                numberOfPages: booksData[j].numberOfPages,
                publisher: booksData[j].publisher,
                country: booksData[j].country,
                mediaType: booksData[j].mediaType,
                released: booksData[j].released,
            })
        }
        //personagens principais
        var booksCharacteres = []
        idPovCharacters = idPovCharacters.filter((item, i) => idPovCharacters.indexOf(item) === i)
        for (var i in idPovCharacters) {
            const responsePovCharacter = await axios.get(`${apiCharacters}${idPovCharacters[i]}`).catch(err => {
                console.log(err)
            })
            var dataPovCharacter = responsePovCharacter.data
            booksCharacteres.push({
                idCharacter: idPovCharacters[i],
                name: dataPovCharacter.name
            })
            var books = []
            var povBooks = []
            if (dataPovCharacter.books.length !== 0) {
                books = await returnBooks(dataPovCharacter.books, idBooks)
            }
            if (dataPovCharacter.povBooks.length !== 0) {
                povBooks = await returnBooks(dataPovCharacter.povBooks, idBooks)
            }
            var spouse = dataPovCharacter.spouse !== "" ? await returnName(dataPovCharacter.spouse) : ""
            var father = dataPovCharacter.father !== "" ? await returnName(dataPovCharacter.father) : ""
            var mother = dataPovCharacter.mother !== "" ? await returnName(dataPovCharacter.mother) : ""

            await povCharacterRepo.create({
                name: dataPovCharacter.name,
                gender: dataPovCharacter.gender,
                culture: dataPovCharacter.culture,
                born: dataPovCharacter.born,
                died: dataPovCharacter.died,
                titles: dataPovCharacter.titles,
                aliases: dataPovCharacter.aliases,
                father: father,
                mother: mother,
                spouse: spouse,
                books: books,
                povBooks:povBooks,
                tvSeries: dataPovCharacter.tvSeries,
                playedBy: dataPovCharacter.playedBy
            })
        }
        var booksSaved = await bookRepo.getAllBooks();
        for (let i = 0; i < booksSaved.length - 1; i++) {
            if (idBooks[i].name === booksSaved[i].name) {
                if (idBooks[i].urlPovCharacter.length > 0) {
                    var array = []
                    for (var j in idBooks[i].urlPovCharacter) {
                        var url = idBooks[i].urlPovCharacter[j].split('/')
                        for (var y in booksCharacteres) {
                            if (booksCharacteres[y].idCharacter === url[url.length - 1]) {
                                var character = await povCharacterRepo.getPovCharacterByName(booksCharacteres[y].name)
                                array.push(character._id)
                            }
                        }
                    }
                    await bookRepo.update(booksSaved[i]._id, { povCharacters: array })
                }

            }
        }
    }

}

module.exports = saveDataApiExternal