const { readFile, writeFile } = require("../utils/fs");
const { verify } = require("../utils/jwt");

const getComments = (req, res) => {
    let comments = readFile("comments");
    let products = readFile("products");
    const { productId } = req.params;

    let product = products.find(el => el.id == productId)

    comments = comments.filter(el => el.productId == productId);

    res.render("home/comments", {comments, productId});
}

const addComment = (req, res) => {
    let users = readFile("users");
    let token = req.cookies.token;
    let check = verify(token);
    let user = users.find(el => el.id === check.id);
    let comments = readFile("comments");
    const { productId } = req.params;
    const { comment, score } = req.body;

    comments.push({
        id: comments.at(-1)?.id + 1 || 1,
        user: user.fullname,
        user_id: user.id,
        comment,
        productId: productId*1,
        score: score*1
    });

    writeFile("comments", comments);

    res.redirect(`/comments/${productId}`);
}

module.exports = {
    getComments,
    addComment
}