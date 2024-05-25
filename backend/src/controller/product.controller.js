import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import { Product } from "../model/product.model.js";

const uploadProductImage = asyncHandler((req, res) => {
	if (!req.file) {
		throw new ApiError(400, "Something went wrong while uploading file");
	}

	const image_url = `http://localhost:${process.env.PORT}/images/${req.file.filename}`;

	return res
		.status(200)
		.json(new ApiResponse(200, image_url, "Image saved successfully"));
});

const addProduct = asyncHandler(async (req, res) => {
	let products = await Product.find({});
	let id;
	if (products.length > 0) {
		let last_product_array = products.slice(-1);
		let last_product = last_product_array[0];
		id = last_product.id + 1;
	} else {
		id = 1;
	}

	const product = new Product({
		id: id,
		name: req.body.name,
		image: req.body.image,
		category: req.body.category,
		new_price: req.body.new_price,
		old_price: req.body.old_price,
	});

	console.log(product);
  await product.save();
  console.log("New Product Saved")

  res
  .json(new ApiResponse(200, product, "New product Added"))
});

export { uploadProductImage, addProduct };
