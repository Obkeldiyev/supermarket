const { readFile, writeFile } = require("../utils/fs");
const { verify } = require("../utils/jwt");

const getOrders = (req, res) => {
    let orders = readFile("orders");
    res.render("admins/orders", { orders });
}

const getUserOrder = (req, res) => {
    let products = readFile("products");
    let orders = readFile("orders");
    const { id } = req.params;
    
    let product = products.find(el => el.id === id*1);

    res.render("home/orders", { product });
}

const order = (req, res) => {
    let orders = readFile("orders");
    let products = readFile("products");
    let users = readFile("users");
    let token = req.cookies.token;
    let check = verify(token);
    const { id } = req.params;
    let user = users.find(el => el.id === check.id);
    
    const { phone, count } = req.body;

    const product = products.find(el => el.id === id*1);

    if(product.count !== 0){
        let order = {
            id: orders.at(-1)?.id+1 || 1,
            user: user.fullname,
            user_id: user.id,
            product: product.name,
            product_id: product.id,
            contact: phone || user.phone,
            count: count*1,
            totalPrice: product.price*1 + count*1
        }
    
        orders.push(order);
    
        products = products.map(el => {
            if(el.id === id*1){
                return{
                    id: el.id,
                    name: el.name,
                    price: el.price*1,
                    count: el.count*1 - order.count*1,
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
    
        writeFile("orders", orders);
        writeFile("products", products)
    
        res.redirect("/");
    }else if(product.count === 0 || product.count === NaN){
        products = products.filter(el => el.id === product.id);

        writeFile("products", products);

        res.redirect("/");
    }
}

const done = (req, res) => {
    let orders = readFile("orders");
    const { id } = req.params;

    orders = orders.filter(el => el.id !== id*1);

    writeFile("orders", orders);
    res.redirect("/orders");
}

module.exports = {
    getOrders,
    order,
    done,
    getUserOrder
}