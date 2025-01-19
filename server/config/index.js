import { config } from "dotenv";

config({ path: "./config.env" }); 

const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;
const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;
const JWT_SECRET = process.env.JWT_SECRET;

export { PORT, MONGO_URL, EMAIL_USER, EMAIL_PASS, JWT_SECRET };
