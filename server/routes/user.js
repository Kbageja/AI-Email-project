import express from "express";
import { userLogin, userLogout, userRegister } from "../controllers/user.js";
import loginLimiter from "../utils/loginLimiter.js";

const router = express.Router();

router.post("/register", userRegister);
router.get("/logout", userLogout);
router.post("/login", loginLimiter, userLogin);
router.get("/check-auth", isAuthenticated, (req, res) => {
  return sendResponse(res, 200, true, "User is authenticated", req.user);
});

export default router;
