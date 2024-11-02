import { config } from "dotenv";

config();

const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;

export { PORT, MONGO_URL };
