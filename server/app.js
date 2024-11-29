import express from "express";
import dotenv from "dotenv";
import { PORT } from "./config/index.js";
import connectDB from "./config/db.js";
import UserRouter from "./routes/user.js";
import CampaignRouter from "./routes/campaign.js";
import RecipientRouter from "./routes/recipient.js";
import cookieParser from "cookie-parser";
import { isAuthenticated } from "./middleware/auth.js";

dotenv.config();

const app = express();

connectDB();

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.use("/user", UserRouter);
app.use("/campaign", isAuthenticated, CampaignRouter);
app.use("/recipient", RecipientRouter);

//dummy company info api
const companyData = [
  { company_name: "sasefied", info: "took recently funding" },
  { company_name: "techly", info: "specializes in AI-driven solutions" },
  {
    company_name: "buildnext",
    info: "focused on sustainable construction technologies",
  },
];
app.get("/api/company", (req, res) => {
  const { name } = req.query; // Fetch company name from query parameters

  if (!name) {
    return res.status(400).json({ error: "Company name is required" });
  }

  // Find company by name
  const company = companyData.find(
    (c) => c.company_name.toLowerCase() === name.toLowerCase()
  );

  if (!company) {
    return res.status(404).json({ error: "Company not found" });
  }

  res.json({ success: true, data: company });
});

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});
