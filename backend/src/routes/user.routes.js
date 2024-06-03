import { Router } from "express";
import { signUp,login, addToCart, removeFromCart } from "../controller/user.controller.js";
import fetchUser from "../middleware/fetchUser.middleware.js";

const router = Router();

// signup route
router.route('/signup').post(signUp)

// login route
router.route('/login').post(login)

//add to cart item
router.route('/addtocart').post(fetchUser, addToCart)

// remove from cart
router.route('/removefromcart').post(fetchUser, removeFromCart)


export default router