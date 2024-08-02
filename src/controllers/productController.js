const { readFile, writeFile } = require("../utils/fs")

const getProducts = (req, res) => {
    let products = readFile("products");
    let categories = readFile("categories");
    res.render("users/products", { products, categories });
}

const getHomeProducts = (req, res) => {
    let products = readFile("products");
    let categories = readFile("categories");
    res.render("home/products", { products, categories });
}

const getAdminProducts = (req, res) => {
    let products = readFile("products");
    let categories = readFile("categories");
    res.render("admins/products", { products, categories });
}

const createPage = (req, res) => {
    let products = readFile("products");
    let categories = readFile("categories");
    res.render("admins/createProducts", { products, categories });
}

const createProducts = (req, res) => {
    let products = readFile("products");
    const { name, price, count, category_name, category_id, img } = req.body;

    const priceNum = parseFloat(price);
    const countNum = parseInt(count);
    const categoryIdNum = parseInt(category_id);

    const existingProduct = products.find(el => 
        el.name === name && 
        el.price === priceNum && 
        el.category_id === categoryIdNum
    );

    if (existingProduct) {
        products = products.map(el => 
            el.id === existingProduct.id 
            ? { ...el, count: el.count + countNum } 
            : el
        );
    } else {
        const newProduct = {
            id: (products.at(-1)?.id || 0) + 1,
            name,
            price: priceNum,
            count: countNum,
            category_name,
            category_id: categoryIdNum,
            img
        };
        products.push(newProduct);
    }

    writeFile("products", products);

    res.redirect("/admins/products");
};

const editproductPage = (req, res) => {
    let products = readFile("products");
    let categories = readFile("categories");

    res.render("admins/editProduct", { products, categories });
}

const editProduct = (req, res) => {
    let products = readFile("products");
    const { id } = req.params;
    const { name, price, count, category_name, category_id, img } = req.body;

    products.map(el => {
        if(el.id === id*1){
            products = products.map({
                id: el.id,
                name, 
                price: price*1,
                count: count*1,
                category_name,
                category_id,
                img
            })
        }else{
            products = products.map({
                id: el.id,
                name: el.name, 
                price: el.price*1,
                count: el.count*1,
                category_name: el.category_name,
                category_id: el.category_id,
                img: el.img
            })
        }
    })

    writeFile("products", products);

    res.redirect("/admins/products");
}

const deleteProduct = (req, res) => {
    let products = readFile("products");
    const { id } = req.params;

    products = products.filter(el => el.id !== id*1);

    writeFile("products", products);

    res.redirect("/admins/products");
}

const addProductPage = (req, res) => {
    let products = readFile("products");
    const { id } = req.params;

    let product = products.find(el => el.id === id*1)
    res.render("admins/addProduct", { product});
}

const addProduct = (req, res) => {
    let products = readFile("products");
    const { id } = req.params;
    const { amount } = req.body

    products = products.map(el => {
        if(el.id === id*1){
            return{
                id: el.id,
                name: el.name,
                price: el.price*1,
                count: el.count*1 + amount*1,
                category_name: el.category_name,
                category_id: el.category_id,
                img: el.img
            }
        }else{
            return{
                id: el.id,
                name: el.name,
                price: el.price*1,
                count: el.count*1,
                category_name: el.category_name,
                category_id: el.category_id,
                img: el.img
            }
        }
    })

    writeFile("products", products);

    res.redirect("/admins/products");
}

module.exports = {
    getProducts,
    createProducts,
    editProduct,
    deleteProduct,
    addProduct,
    getAdminProducts,
    editproductPage,
    getHomeProducts,
    createPage,
    addProductPage
}