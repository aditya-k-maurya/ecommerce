import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken"

const uploadProductImage = asyncHandler((req, res) => {
  if (!req.file) {
    throw new ApiError(400, "Something went wrong while uploading file")
  }

  const image_url = `http://localhost:${process.env.PORT}/images/${req.file.filename}`

  return res
  .status(200)
  .json(new ApiResponse(200, image_url, "Image saved successfully"))
})


export {uploadProductImage}