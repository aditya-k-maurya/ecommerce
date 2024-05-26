import { Router } from "express";
import { upload } from "../middleware/multer.middleware.js";
import { addProduct, deleteProduct, getAllProduct, uploadProductImage } from "../controller/product.controller.js";

const router = Router();

// uploading image of product using multer
router.route("/upload").post(upload.single("product"), uploadProductImage);

// uploading product details in database
router.route("/addproduct").post(addProduct)

// deleting product from the database
router.route('/removeproduct').post(deleteProduct)

// get all product from the database
router.route('/allproducts').get(getAllProduct)

export default router;
