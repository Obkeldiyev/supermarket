const { readFile } = require("../utils/fs");
const { verify } = require("../utils/jwt");

const hasRole = (req, res, next) => {
    let token = req.cookies.token;
    if (!token) {
        return res.redirect("/admins/login");
    }

    let admins = readFile("admins");
    let decodedToken;

    try {
        decodedToken = verify(token);
    } catch (err) {
        return res.redirect("/admins/login");
    }

    let check = admins.find(el => el.id === decodedToken.id);
    if (check && check.role === "admin") {
        next();
    } else {
        res.redirect("/admins/login");
    }
}

module.exports = hasRole;
