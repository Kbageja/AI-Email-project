import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/index.js";

const sendCookie = (res, user) => {
  const token = jwt.sign({ _id: user._id }, JWT_SECRET);
  res.cookie("token", token, {
    maxAge: 20 * 60 * 1000,
    httpOnly: true,
    sameSite: "none",
    secure: true,
  });
};

export default sendCookie;
