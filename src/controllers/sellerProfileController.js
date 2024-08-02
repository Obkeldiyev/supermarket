const { readFile, writeFile } = require("../utils/fs");
const { verify } = require("../utils/jwt");

const getSellerProfile = (req, res) => {
    let token = req.cookies.token;
    let sellers = readFile("sellers");
    let check = verify(token);

    let seller = sellers.find(el => el.id === check.id);

    res.render("sellers/profile");
}

const getEditSellerProfile = (req, res) => {
    let sellers = readFile("sellers");
    let { id } = req.params;

    let seller = sellers.find(el => el.id === id*1);

    res.render("sellers/editProfile", seller);
}

const editSeller = (req, res) => {
    let sellers = readFile("sellers");
    const { id } = req.params;

    let exists = sellers.find(el => el.id === id*1);

    const { fullname, username, password, phone } = req.body;

    sellers.map(el => {
        if(el.id === id){
            return{
                id: el.id,
                fullname,
                username,
                password,
                phone,
                role: el.role
            }
        }else{
            return{
                id: el.id,
                fullname: el.fullname,
                username: el.username,
                password: el.password,
                phone: el.phone,
                role: el.role
            }
        }
    });

    writeFile("sellers", sellers);

    res.redirect("/sellers/profile");
}

const exitSeller = (req, res) => {
    res.clearCookie("token");
}

const deleteSeller = (req, res) => {
    
}

module.exports = {
    getSellerProfile
}