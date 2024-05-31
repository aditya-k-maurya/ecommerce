import { Router } from "express";
import { signUp,login } from "../controller/user.controller.js";

const router = Router();

// signup route
router.route('/signup').post(signUp)

// login route
router.route('/login').post(login)


export default router