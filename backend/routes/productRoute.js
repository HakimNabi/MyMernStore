const express = require("express");
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails, createProductReview, getProductReviews, deleteReview } = require("../controllers/productController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const router = express.Router();




module.exports = router
//Get
router.route("/products").get(getAllProducts);

//Post
router.route("/admin/product/new").post(isAuthenticatedUser, authorizeRoles("admin"), createProduct);

//Update & Delete
router.route("/admin/product/:id")
    .put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct)
    .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct)


//Get Product Detail by Id
router.route("/product/:id").get(getProductDetails);

router.route("/review").put(isAuthenticatedUser, createProductReview)


//Get & Delete Product reviews
router.route("/reviews").get(getProductReviews).delete(isAuthenticatedUser, deleteReview)