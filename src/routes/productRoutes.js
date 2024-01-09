const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const {
  authenticate,
  requireSuperUser,
} = require("../middleware/authMiddleware");

// Create a new product
router.post("/", authenticate, productController.createProduct);

// Get all products for the user's company
router.get("/", authenticate, productController.getAllProducts);

// Search products route
router.get('/search', authenticate, productController.searchProducts);


// Get a single product by ID
router.get("/:id", authenticate, productController.getProductById);

// Update a product
router.put("/:id", authenticate, productController.updateProduct);

// Delete a product
router.delete("/:id", authenticate, productController.deleteProduct);


module.exports = router;
