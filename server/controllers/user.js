import User from "../models/user.js";
import sendCookie from "../utils/cookieHandler.js";
import sendResponse from "../utils/responseHandler.js";
import bcrypt from "bcrypt";

// user register
const userRegister = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return sendResponse(res, 400, false, "All fields are required");
  }

  if (password.length < 3) {
    return sendResponse(
      res,
      400,
      false,
      "Password must be at least 3 characters long"
    );
  }
  try {
    let user = await User.findOne({ email });
    if (user) {
      return sendResponse(res, 400, false, "User Already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user = await User.create({ name, email, password: hashedPassword });
    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;
    sendCookie(res, userWithoutPassword);
    return sendResponse(res, 201, true, "User Created", userWithoutPassword);
  } catch (error) {
    console.error("Error during user registration:", error.message);
    return sendResponse(
      res,
      500,
      false,
      "An error occurred during registration"
    );
  }
};

//user login
const userLogin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return sendResponse(res, 400, false, "All fields are required");
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return sendResponse(res, 401, false, "Invalid email or password");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return sendResponse(res, 401, false, "Invalid email or password");
    }

    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;
    sendCookie(res, userWithoutPassword);
    return sendResponse(
      res,
      200,
      true,
      "Logged In Successfully !",
      userWithoutPassword
    );
  } catch (error) {
    console.error("Error during user login:", error.message);
    return sendResponse(res, 500, false, "An error occurred during login");
  }
};

//user logout
const userLogout = (req, res) => {
  try {
    res.cookie("token", null, { expires: new Date(0), httpOnly: true });

    return sendResponse(res, 200, true, "Logged out successfully !");
  } catch (error) {
    console.error("Error during user logout:", error.message);
    return sendResponse(res, 500, false, "An error occurred during logout");
  }
};

export { userRegister, userLogout, userLogin };
