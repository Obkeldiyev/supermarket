const { readFile, writeFile } = require("../utils/fs");
const { verify } = require("../utils/jwt");

const getProfile = (req, res) => {
    let admins = readFile("admins");
    let token = req.cookies.token;
    let checkAdmin = verify(token);
    let admin = admins.find((el) => el.id === checkAdmin.id);
  
    res.render("admins/profile", { admin });
};

const editAdmin = (req, res) => {
    let admins = readFile("admins");
    const { id } = req.params;
    const { fullname, username, password, phone } = req.body;
    
    admins = admins.map(el => {
        if(el.id === id*1){
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
    })

    writeFile("admins", admins);

    res.redirect("/admins/profile")
}

const deleteProfile = (req, res) => {
    let admins = readFile("admins");
    const { id } = req.params;

    admins = admins.filter(el => el.id !== id*1);

    writeFile("admins", admins);

    res.redirect("/");
}

const exitAdmin = (req, res) => {
    res.clearCookie("token");
    res.redirect("/")
}

const getAdminProfile = (req, res) => {
    let admins = readFile("admins");
    const { id } = req.params;

    let admin = admins.find(el => el.id === id*1);

    res.render("admins/editProfile", { admin });
}

module.exports = {
    getProfile,
    editAdmin,
    deleteProfile,
    exitAdmin,
    getAdminProfile
}