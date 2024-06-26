import { Router } from "express";
import { upload } from "../middleware/multer.middleware.js";
import { addProduct, deleteProduct, getAllProduct, newCollection, popularInWomen, uploadProductImage } from "../controller/product.controller.js";

const router = Router();

// uploading image of product using multer
router.route("/upload").post(upload.single("product"), uploadProductImage);

// uploading product details in database
router.route("/addproduct").post(addProduct)

// deleting product from the database
router.route('/removeproduct').post(deleteProduct)

// get all product from the database
router.route('/allproducts').get(getAllProduct)

// get new collection
router.route('/newcollection').get(newCollection)

// get popular in women category
router.route('/popularinwomen').get(popularInWomen)

export default router;
