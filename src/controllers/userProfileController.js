const { readFile, writeFile } = require("../utils/fs");
const { verify } = require("../utils/jwt");

const getUserProfile = (req, res) => {
    let token = req.cookies.token;
    let users = readFile("users");
    let check = verify(token);

    let user = users.find(el => el.id === check.id);

    res.render("users/profile", { user })
}

const getEditUserProfile = (req, res) => {
    let users = readFile("users");
    const { id } = req.params;
    
    const user = users.find(el => el.id === id);

    res.render("users/editProfile", { user });
}

const editUserProfile = (req, res) => {
    let users = readFile("users");
    const { id } = req.params;
    const { fullname, username, password } = req.body;
    
    users = users.map(el => {
        if(el.id == id){
            return{
                id: el.id,
                fullname,
                username,
                password,
                role: el.role
            }
        }else{
            return{
                id: el.id,
                fullname: el.fullname,
                username: el.username,
                password: el.password,
                role: el.role
            }
        }
    })

    writeFile("users", users);

    res.redirect("/users/profile");
}

const deleteUserProfile = (req, res) => {
    let users = readFile("users");
    const { id } = req.params;

    users = users.filter(el => el.id != id);

    writeFile("users", users);

    res.clearCookie("token");

    res.redirect("/")
}

const exit = (req, res) => {
    res.clearCookie("token");
    res.redirect("/")
}

module.exports = {
    getUserProfile,
    editUserProfile,
    deleteUserProfile,
    getEditUserProfile,
    exit
}