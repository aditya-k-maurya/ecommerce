import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Users } from "../model/user.model.js";
import jwt from "jsonwebtoken"

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

	const user = new Users({
		name: name,
		email: email,
		password: password,
		cartData: cart,
	});

	await user.save();

	const data = {
		user: {
			id: user.id,
		},
	};

  const token = jwt.sign(data, process.env.JWT_SECRET);
  
  res
    .json(new ApiResponse(200, token, "Registered Successfully"));
});

export { signUp };
