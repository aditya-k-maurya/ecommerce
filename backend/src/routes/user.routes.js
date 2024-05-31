import { Router } from "express";
import { signUp } from "../controller/user.controller.js";

const router = Router();

// signup route
router.route('/signup').post(signUp)


export default router