import express from "express";
import { userLogin, userLogout, userRegister } from "../controllers/user.js";
import loginLimiter from "../utils/loginLimiter.js";

const router = express.Router();

router.post("/register", userRegister);
router.get("/logout", userLogout);
router.post("/login", loginLimiter, userLogin);

export default router;
