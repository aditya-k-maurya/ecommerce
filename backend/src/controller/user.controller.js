import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Users } from "../model/user.model.js";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import mongoose from "mongoose";

const signUp = asyncHandler(async (req, res) => {
	const { name, email, password } = req.body;

	let check = await Users.findOne({ email: email });
	if (check) {
		throw new ApiError(400, "The email already exists");
	}

	let cart = {};
	for (let i = 0; i < 300; i++) {
		cart[i] = 0;
	}

	// password into hashpassword
	const salt = await bcryptjs.genSalt(10);
	const hashpassword = await bcryptjs.hash(password, salt);

	const user = new Users({
		name: name,
		email: email,
		password: hashpassword,
		cartData: cart,
	});

	await user.save();

	const data = {
		user: {
			id: user.id,
		},
	};

	const token = jwt.sign(data, process.env.JWT_SECRET);

	res.json(new ApiResponse(200, token, "Registered Successfully"));
});

const login = asyncHandler(async (req, res) => {
	const { email, password } = req.body;

	console.log("Email:", email);
	console.log("Password:", password);

	if (!email || !password) {
		throw new ApiError(400, "email and password are required");
	}

	let user = await Users.findOne({ email });

	if (!user) {
		throw new ApiError(400, "Email doesn't exists");
	}

	const verifyPassword = await bcryptjs.compare(password, user.password);

	if (!verifyPassword) {
		throw new ApiError(400, "Invalid credientials");
	}

	const data = {
		user: {
			id: user._id,
		},
	};

	const token = jwt.sign(data, process.env.JWT_SECRET, {
		expiresIn: "7d",
	});

	const cookiesOption = {
		httpOnly: true,
		secure: true,
	};

	res
		.status(200)
		.cookie("token", token, cookiesOption)
		.json(new ApiResponse(200, token, "User logged in successfully"));
});

const addToCart = asyncHandler(async (req, res) => {
	const { user, itemId } = req.body;

	const userId = new mongoose.Types.ObjectId(user);
	let userData = await Users.findOne({ _id: userId });
	// console.log(userData)
	userData.cartData[itemId] += 1;
	await Users.findOneAndUpdate(
		{ _id: userId },
		{ cartData: userData.cartData }
	);
	res.send("Item Added Successfully");
});

const removeFromCart = asyncHandler(async (req, res) => {
	const { user, itemId } = req.body;
	const userId = new mongoose.Types.ObjectId(user);
	let userData = await Users.findOne({ _id: userId });
	if (userData.cartData[itemId] > 0) userData.cartData[itemId] -= 1;

	await Users.findOneAndUpdate(
		{ _id: userId },
		{ cartData: userData.cartData }
	);
	res.send("Item Removed Successfully");
});

const getCartData = asyncHandler(async (req, res) => {
	const { user } = req.body;
	const userId = new mongoose.Types.ObjectId(user);
	let userData = await Users.findOne({ _id: userId });
	res
		.status(200)
		.json(
			new ApiResponse(
				200,
				userData.cartData,
				"User cart Data fetched successfully"
			)
		);
});

export { signUp, login, addToCart, removeFromCart, getCartData };
