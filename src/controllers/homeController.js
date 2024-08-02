const { readFile } = require("../utils/fs")

const getHome = (req, res) => {
    let products = readFile("products");
    let categories = readFile("categories");
    res.render("home/index", { products, categories });
}

const loginHome = (req, res) => {
    let products = readFile("products");
    let categories = readFile("categories");

    res.render("users/products", { products, categories });
}

module.exports = {
    getHome,
    loginHome
}