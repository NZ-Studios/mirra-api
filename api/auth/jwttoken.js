const jwt = require('jsonwebtoken');
const secrets = require('../../config/secrets');

function getToken(user) {
    const payload = {
        id: user.id,
        email: user.email,
        password: user.password
    };
    const options = {
        expiresIn: "30d"
    }

    return jwt.sign(payload, secrets.jwtSecret, options);
}


function verify(token) {
    try {
        const results = jwt.verify(token, secrets.jwtSecret);
        return { status: 0, results: results }
    }
    catch (error) {
        return { status: 1, results: error }
    }
}

module.exports = { getToken, verify }