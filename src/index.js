const express = require("express");
const path = require("path")
const cookieParser = require("cookie-parser");
const router = require("./routes");

const app = express();

app.use(cookieParser())
app.set("view engine", "ejs");
app.set("views", path.join(process.cwd(), "src", "views"));
app.use(express.static(path.join(process.cwd(), "src", "public")));
app.use(express.urlencoded({extended: true}));
app.use(router);

app.listen(9000, () => {
    console.log(9000);
});