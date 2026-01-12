const router = require("express").Router()
const { addProduct, getProducts,getProductById,getUniqueCategories } = require("../controllers/productController")
const upload = require("../middleware/multer")

router.post("/", upload.single("image"), addProduct)
router.get("/", getProducts)
router.get("/:id", getProductById);
// backend/routes/productRoutes.js
// backend/routes/productRoutes.js
router.get('/categories', getUniqueCategories);

module.exports = router
