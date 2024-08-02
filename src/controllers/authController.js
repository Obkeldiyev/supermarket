const { readFile, writeFile } = require("../utils/fs");
const { sign } = require("../utils/jwt");
const uuid = require("uuid");

const GetAdimLogin = (req, res) => {
    res.render("admins/auth");
}

const adminLogin = (req, res) => {
    res.clearCookie("token");
    let admins = readFile("admins");
    const { username, password } = req.body;
    const admin = admins.find(el => el.username === username && password === password);

    if(admin){
        let token = sign({id: admin.id, role: "admin"});
        res.cookie("token", token);
        res.redirect("/admins");
    }else{
        res.redirect("/admins/login");
    }
}

const getUserLogin = (req, res) => {
    res.render("users/auth");
}

const userLogin = (req, res) => {
    res.clearCookie("token")
    let users = readFile("users");
    const { username, password } = req.body;
    const user = users.find(el => el.username === username && el.password === password);

    if(user){
        let token = sign({id: user.id, role: "user"});
        res.cookie("token", token);
        res.redirect("/main");
    }else{
        res.redirect("/users/login")
    }
}

const userRegister = (req, res) => {
    res.clearCookie("token")
    let users = readFile("users");
    const { fullname, username, password, phone } = req.body;
    const check = users.find(el => el.username === username);

    if(check){
        res.redirect("/users/login");
    }else{
        let user = {
            id: uuid.v4(),
            fullname,
            username,
            password,
            phone,
            role: "user"
        }

        users.push(user);

        writeFile("users", users);

        let token = sign({id: user.id, role: "user"});
        res.cookie("token", token);
        res.redirect("/main")
    }
}

const sellerLogin = (req, res) => {
    res.clearCookie("token");
    let sellers = readFile("sellers");
    const { username, password } = req.body;
    const exists = sellers.find(el => el.username === username && el.password === password);

    if(exists){
        let token = sign({id: exists.id, role: "seller"});
        res.cookie("token", token);
        res.redirect("/main");
    }else{
        res.redirect("/sellers/login");
    }
}

const sellerRegister = (req, res) => {
    res.clearCookie("token");
    let sellers = readFile("sellers");
    const { fullname, username, password, phone } = req.body;
    const exists = sellers.find(el => el.username === username);

    if(exists){
        res.redirect("/sellers/register");
    }else{
        let seller = {
            id: sellers.at(-1)?.id + 1 || 1,
            fullname, 
            username,
            password,
            phone,
            role: "seller"
        }

        sellers.push(seller);

        writeFile("sellers", sellers);

        let token = sign({id: user.id, role: "seller"});
        res.cookie("token", token);
        res.redirect("/sell")
    }
}

module.exports = {
    GetAdimLogin,
    adminLogin,
    getUserLogin,
    userLogin,
    userRegister
}