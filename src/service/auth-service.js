const jwt = require('jsonwebtoken');
require('dotenv').config()

exports.generateToken = async (data) => {
    return jwt.sign(data, process.env.SECRET_KEY, { expiresIn: '1d' });
}

exports.decodeToken = async (token) => {
    var data = await jwt.verify(token, process.env.SECRET_KEY);
    return data;
}


exports.authorize = function (req, res, next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (!token) {
        errors.returnError(res, 401, "Acesso Restrito!!");
    } else {
        jwt.verify(token, process.env.SECRET_KEY, function (error, decoded) {
            if (error) {
                errors.returnError(res, 401, "Token Inválido!!!");
                return
            } else {
                next();
            }
        })
    }
}
