import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import "dotenv/config";
import authRouter from "./routes/authRoutes.js";
import referralRouter from "./routes/referralRoutes.js";
import applyRoutes from "./routes/applyRoutes.js";

const app = express();
const PORT = process.env.PORT || 6969;

app.use(bodyParser.json());
app.use(cors());

app.use("/auth", authRouter);
app.use("/refer", referralRouter);
app.use("/referral", applyRoutes);

app.get("/health", (_, res) => {
  res.status(200).json({ status: "OK" });
});

app.listen(PORT, () => {
  console.log(`Stock Screener server is running on ${PORT}`);
});
