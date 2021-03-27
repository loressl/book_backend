const repository = require('../repositories/user-repository')
const authService = require('../service/auth-service')

exports.post = async (req, res, next) => {
    try {
        var username = req.body.username
        var password = req.body.password
        var user = await repository.getByUsername(username)
        if (user !== null) {
            res.status(400).send({ mensagem: "Usuário já existe, verifique seus dados!!" })
        }
        var user = await repository.create({
            username: username,
            password: password
        })
        res.status(201).send({ user })

    } catch (error) {
        res.status(500).send({
            mensagem: "Falha ao processar sua requisição!!"
        })
    }
}

exports.login = async (req, res, next) => {
    try {
        var user = await repository.authenticate(req.body.username, req.body.password)
        if (user === null) {
            res.status(404).send({ mensagem: "Usuário não existe na base de dados. Verifique seu e-mail ou senha." })
        }
        const token = await authService.generateToken({
            username: user.username,
            id: user._id
        })
        res.status(200).send({ token: token })
    } catch (error) {
        res.status(500).send({
            mensagem: "Falha ao processar sua requisição!!"
        })
    }
}

exports.refreshToken = async (req, res, next) => {
    try {
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        const data = await authService.decodeToken(token);

        const user = await repository.getByUsername(data.username);

        if (!user) {
            res.status(404).send({ mensagem: "Usuário não existe na base de dados. Verifique seu e-mail ou senha." })
            return
        }

        const newToken = await authService.generateToken({
            username: user.username,
            id: user._id
        })

        res.status(200).send({
            token: newToken
        })

    } catch (e) {
        res.status(500).send({
            mensagem: "Falha ao processar sua requisição!!"
        })
    }
}
