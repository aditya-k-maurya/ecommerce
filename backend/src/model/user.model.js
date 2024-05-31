import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			unique: true,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		cartData: {
			type: Object,
		},
	},
	{
		timestamps: true,
	}
);

export const Users = mongoose.model("Users", userSchema);
