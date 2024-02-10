import express from "express";
import { authenticateUser } from "../middleware/authMiddleware.js";
import * as referralHandlers from "../handlers/applyHandlers.js";

const applyRoutes = express.Router();

applyRoutes.post(
  "/apply/:post_id",
  authenticateUser,
  referralHandlers.applyToReferralPosting
);
applyRoutes.get(
  "/user",
  authenticateUser,
  referralHandlers.getApplicationsByUserId
);

applyRoutes.get(
  "/appliers/:postId",
  //   authenticateUser,
  referralHandlers.getApplicationsByPostingId
);

applyRoutes;

export default applyRoutes;
