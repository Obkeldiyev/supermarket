const { readFile, writeFile } = require("../utils/fs");

const getCategories = (req, res) => {
    let categories = readFile("categories");
    res.render("home/categories", { categories });
}

const filter = (req, res) => {
    let categories = readFile("categories");
    let products = readFile("products");
    const { id } = req.params;

    products = products.filter(el => el.category_id == id);

    res.render("home/filteredCategories", { products });
}

const adminCategories = (req, res) => {
    let categories = readFile("categories");
    res.render("admins/categories", { categories })
}

const editCategoryPage = (req, res) => {
    let categories = readFile("categories");
    const { id } = req.params;

    let category = categories.find(el => el.id === id*1);

    res.render("admins/editCategory", {category});
}

const addCategoryPage = (req, res) => {
    let categories = readFile("categories");

    res.render("admins/addCategory", { categories });
}

const addCategory = (req, res) => {
    let categories = readFile("categories");
    const {name} = req.body;
    const check = categories.find(el => el.name === name);

    if(check){
        res.redirect("/admins/categories");
    }else{
        categories.push({
            id: categories.at(-1)?.id + 1 || 1,
            name
        });

        writeFile("categories", categories);
        res.redirect("/admins/categories");
    }
}

const editCategory = (req, res) => {
    let categories = readFile("categories");
    const { id } = req.params;
    const { name } = req.body;

    categories = categories.map(el => {
        if(el.id === id*1){
            return {
                id: el.id,
                name
            }
        }else{
            return {
                id: el.id,
                name: el.name
            }
        }
    })

    writeFile("categories", categories);

    res.redirect("/admins/categories")
}

const deleteCategory = (req, res) => {
    let categories = readFile("categories");
    const { id } = req.params;

    categories = categories.filter(el => el.id !== id*1);

    writeFile("categories", categories);

    res.redirect("/admins/categories")
}

module.exports = {
    getCategories,
    addCategory,
    editCategory,
    deleteCategory,
    adminCategories,
    filter,
    editCategoryPage,
    addCategoryPage
}