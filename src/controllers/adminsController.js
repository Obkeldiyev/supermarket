const { readFile, writeFile } = require("../utils/fs");

const getAdmins = (req, res) => {
    let admins = readFile("admins");
    res.render("admins/admins", { admins });
}

const createAdminsPage = (req, res) => {
    let admins = readFile("admins");
    res.render("admins/create", { admins });
}

const createAdmins = (req, res) => {
    let admins = readFile("admins");
    const { fullname, username, password, phone } = req.body;
    const check = admins.find(el => el.username === username);

    if(check){
        res.redirect("/admins/login");
    }else{
        admins.push({
            id: admins.at(-1)?.id + 1 || 1,
            fullname,
            username,
            password,
            phone,
            role: "admin"
        });

        writeFile("admins", admins);

        res.redirect("/admins");
    }
}

const getUsers = (req, res) => {

}

const editUsers = (req, res) => {

}

module.exports = {
    getAdmins,
    createAdmins,
    createAdminsPage
}