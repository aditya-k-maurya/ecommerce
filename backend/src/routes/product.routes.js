import { Router } from "express";
import { upload } from "../middleware/multer.middleware.js";
import { uploadProductImage } from "../controller/product.controller.js";

const router = Router();

router.route("/upload").post(upload.single("product"), uploadProductImage);

export default router;
