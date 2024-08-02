const { readFile } = require("../utils/fs");
const { verify } = require("../utils/jwt");

const verifyToken = (req, res, next) => {
    let token = req.cookies.token;
    let admins = readFile("admins");
    let decodedToken = verify(token);
    let checkAdmin = admins.find(el => el.id === decodedToken.id);
    if (checkAdmin && checkAdmin.role === "admin") {
        next();
    } else {
        res.redirect("/admins/login");
    }
}

const verifyUserToken = (req, res, next) => {
    let token = req.cookies.token;
    let users = readFile("users");
    let decodedToken = verify(token);
    let checkUser = users.find(el => el.id === decodedToken.id);
    if (checkUser && checkUser.role === "user") {
        next();
    } else {
        res.redirect("/users/login");
    }
}

module.exports = {
    verifyToken,
    verifyUserToken
}
