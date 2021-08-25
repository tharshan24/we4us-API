const main = require('../config/main');
const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {

    const bearerHeader = req.headers['authorization'];
    // Check if bearer is undefined
    if(typeof bearerHeader !== 'undefined') {
        // Split at the space
        const bearer = bearerHeader.split(' ');
        // Get token from array
        const bearerToken = bearer[1];
        // Set the token
        req.token = bearerToken;
        // Next middleware
        jwt.verify(req.token, main.key, (err, authData) => {
            if(err) {
                res.json({
                    status: 403,
                    message: "verification error"
                });
            } else {
                req.headers.authData = authData;
                next();
            }
        });
    } else {
        // Forbidden
        res.json({
            status: 403,
            message: "no header"
        });
    }
}

module.exports ={
    verifyToken:verifyToken
}