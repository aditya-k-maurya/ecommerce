import mongoose, { Schema } from "mongoose";

const productSchema = new Schema(
	{
		id: {
			type: Number,
			required: true,
		},
		name: {
			type: String,
			required: true,
		},
		image: {
			type: String,
			required: true,
		},
		new_price: {
			type: Number,
			required: true,
		},
		old_price: Number,
		category: {
			type: String,
			required: true,
		},
		available: {
			type: Boolean,
			default: true,
		},
	},
	{
		timestamps: true,
	}
);

export const Product = mongoose.model("Product", productSchema);
