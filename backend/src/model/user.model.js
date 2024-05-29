import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
		
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique:true
    },
    passowrd: {
      type:String
    },
    cartData: {
      type:Object
    },

  }, {
    timestamps: true
  }
);

export const Users = mongoose.model("Users", userSchema);
