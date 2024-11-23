import jwt from "jsonwebtoken";
import sendResponse from "../utils/responseHandler.js";
import { JWT_SECRET } from "../config/index.js";

export const isAuthenticated = async (req, res, next) => {
  // Check if token exists in cookies
  const { token } = req.cookies;
  if (!token) {
    return sendResponse(res, 401, false, "Unauthorized: No token provided");
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    const user = {
      _id: decoded._id,
      name: decoded.name,
      email: decoded.email,
    };
    req.user = user;

    next();
  } catch (error) {
    // Handle errors: invalid token or expired token
    let errorMessage = "Unauthorized: Invalid token";
    if (error.name === "TokenExpiredError") {
      errorMessage = "Unauthorized: Token has expired";
    }
    return sendResponse(res, 401, false, errorMessage);
  }
};
