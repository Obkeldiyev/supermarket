const jwt = require("jsonwebtoken");

const sign = (payload) => {
    return jwt.sign(payload, "qwerty");
}

const verify = (token) => {
    try {
        return jwt.verify(token, "qwerty");
    } catch (error) {
        return {};
    }
}

module.exports = {
    sign,
    verify
}