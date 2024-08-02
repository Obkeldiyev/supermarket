const { Router } = require("express");
const { GetAdimLogin, adminLogin, getUserLogin, userLogin, userRegister } = require("../controllers/authController");
const { getHome, loginHome } = require("../controllers/homeController");
const { getCategories, addCategory, editCategory, deleteCategory, adminCategories, filter, editCategoryPage, addCategoryPage } = require("../controllers/categoryController");
const { verifyToken, verifyUserToken } = require("../middleware/verifyToken");
const hasRole = require("../middleware/hasRole");
const { getProducts, createProducts, editProduct, deleteProduct, addProduct } = require("../controllers/productController");
const { getAdmins, createAdmins, createAdminsPage } = require("../controllers/adminsController");
const { getProfile, editAdmin, deleteProfile, exitAdmin, getAdminProfile } = require("../controllers/adminProfileController");
const { getUserProfile, editUserProfile, deleteUserProfile, getEditUserProfile, exit } = require("../controllers/userProfileController");
const { getOrders, order, done, getUserOrder } = require("../controllers/orderController");
const { getAdminProducts } = require("../controllers/productController");
const { editproductPage } = require("../controllers/productController");
const { getHomeProducts } = require("../controllers/productController");
const { createPage } = require("../controllers/productController");
const { addProductPage } = require("../controllers/productController");
const { getComments, addComment } = require("../controllers/commentController");
const { getSellerProfile } = require("../controllers/sellerProfileController");

const router = Router();

router.get("/", getHome);
router.get("/products/home", getHomeProducts);
router.get("/main", verifyUserToken, loginHome)

router.get("/admins/login", GetAdimLogin);
router.post("/admins/login", adminLogin);
router.get("/admins", verifyToken, hasRole, getAdmins);
router.get("/admins/create", verifyToken, hasRole, createAdminsPage);
router.post("/admins/create", verifyToken, hasRole, createAdmins);
router.get("/admins/profile", verifyToken, hasRole, getProfile);
router.get("/admins/edit/:id", verifyToken, hasRole, getAdminProfile);
router.post("/admins/edit/:id", verifyToken, hasRole, editAdmin);
router.post("/admins/delete/:id", verifyToken, hasRole, deleteProfile);
router.post("/admins/exit", verifyToken, hasRole, exitAdmin);

router.get("/users/login", getUserLogin);
router.post("/users/login", userLogin);
router.post("/users/register", userRegister);
router.get("/users/profile", verifyUserToken, getUserProfile);
router.get("/users/edit/:id", verifyUserToken, getEditUserProfile)
router.post("/users/edit/:id", verifyUserToken, editUserProfile);
router.post("/users/delete/:id", verifyUserToken, deleteUserProfile);
router.post("/users/exit", verifyUserToken, exit)

// adding some categories for home
router.get("/categories", verifyUserToken, getCategories);
router.get("/admins/categories", verifyToken, hasRole, adminCategories);
router.get("/categories/create", verifyToken, hasRole, addCategoryPage);
router.post("/categories/create", verifyToken, hasRole, addCategory);
router.get("/categories/edit/:id", verifyToken, hasRole, editCategoryPage)
router.post("/categories/edit/:id", verifyToken, hasRole, editCategory);
router.post("/categories/delete/:id", verifyToken, hasRole, deleteCategory);
router.get("/categories/:id", verifyUserToken, filter);

router.get("/products", verifyUserToken, getProducts);
router.get("/products/create", verifyToken, hasRole, createPage)
router.post("/products/create", verifyToken, hasRole, createProducts);
router.get("/products/edit/:id", verifyToken, hasRole, editproductPage);
router.post("/products/edit/:id", verifyToken, hasRole, editProduct);
router.post("/products/delete/:id", verifyToken, hasRole, deleteProduct);
router.get("/products/add/:id", verifyToken, hasRole, addProductPage)
router.post("/products/add/:id", verifyToken, hasRole, addProduct);
router.get("/admins/products", verifyToken, hasRole, getAdminProducts);

router.get("/orders", verifyToken, hasRole, getOrders);
router.get("/products/:id", verifyUserToken, getUserOrder);
router.post("/orders/:id", verifyUserToken, order);
router.post("/orders/done/:id", verifyToken, hasRole, done);

router.get("/comments/:productId", verifyUserToken, getComments);
router.post("/comments/:productId", verifyUserToken, addComment);

router.get("/seller/profile", getSellerProfile);

router.use((req, res) => {
    res.status(404).render("not-found");
})

module.exports = router;
