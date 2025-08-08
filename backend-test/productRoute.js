const express = require('express');
const { getAllProducts, getProductDetails, updateProduct, deleteProduct, getProductReviews, deleteReview, createProductReview, createProduct, getAdminProducts, getProducts, getTestProducts, getTestProductById, getTestProductsByCategory, createTestProduct } = require('../controllers/productController');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/user_actions/auth');
const { validateProduct, validateTestProduct } = require("../middlewares/validator")

const router = express.Router();

// Test API Routes
router.route('/test/products').get(getTestProducts);
router.route('/test/products').get(getTestProductsByCategory);
router.route('/test/products/:id').get(getTestProductById);
router.route('/test/products').post(validateTestProduct, createTestProduct);

// Existing routes
router.route('/products').get(getAllProducts);
router.route('/products/all').get(getProducts);

router.route('/admin/products').get(isAuthenticatedUser, authorizeRoles("admin"), getAdminProducts, validateProduct);
router.route('/admin/product/new').post(isAuthenticatedUser, authorizeRoles("admin"), createProduct, validateProduct);

router.route('/admin/product/:id')
    .put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct)
    .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct);

router.route('/product/:id').get(getProductDetails);

router.route('/review').put(isAuthenticatedUser, createProductReview);

router.route('/admin/reviews')
    .get(getProductReviews)
    .delete(isAuthenticatedUser, deleteReview);

module.exports = router;