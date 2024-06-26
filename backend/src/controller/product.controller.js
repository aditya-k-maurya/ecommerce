import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
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
	console.log("New Product Saved");

	res.status(200).json(new ApiResponse(200, product, "New product Added"));
});

const deleteProduct = asyncHandler(async (req, res) => {
	const { id, name } = req.body;

	await Product.findOneAndDelete({ id: id });

	console.log("Product removed");
	res
		.status(200)
		.json(new ApiResponse(200, name, "Product has been removed"));
});

const getAllProduct = asyncHandler(async (req, res) => {
	let products = await Product.find({});

	if (!products || products.length == 0) {
		res.json(new ApiResponse(200,[], "No product to display"));
	}

	res.json(new ApiResponse(200, products, "All product fetched"));
});

const newCollection = asyncHandler(async (req, res) => {
	let product = await Product.find({});
	if (!product) {
		throw new ApiError(500, "Something went wrong in fetching the data")
	}
	let newCollection = product.slice(1).slice(-8);
	res
		.status(200)
	.json(new ApiResponse(200, newCollection, "New collection fetched"))
})

const popularInWomen = asyncHandler(async (req, res) => {
	let products = await Product.find({ category: "women" })
	if (!products) {
		throw new ApiError(500, "Something went wrong in fetching the data")
	}
	let popular_in_women = products.slice(0, 4)

	res
	.status(200)
	.json(new ApiResponse(200, popular_in_women, "popular in women is fetched"))
})

export { uploadProductImage, addProduct, deleteProduct, getAllProduct, newCollection , popularInWomen};
