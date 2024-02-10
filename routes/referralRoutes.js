import express from "express";
import { authenticateUser } from "../middleware/authMiddleware.js";
import * as referralHandlers from "./../handlers/referralHandlers.js";

const referralRouter = express.Router();

// new referral post
referralRouter.post(
  "/post",
  authenticateUser,
  referralHandlers.createReferralPosting
);

// get all the referral posts
referralRouter.get("/posts", referralHandlers.getAllReferralPostings);

// get all refferal posts that one user has posted
referralRouter.get(
  "/posts/user",
  authenticateUser,
  referralHandlers.getAllReferralPostingsByUser
);

// get referral posting by ID
referralRouter.get("/post/:postId", referralHandlers.getReferralPostingById);

// update referral post (PUT Api)
referralRouter.put(
  "/post/:postId",
  authenticateUser,
  referralHandlers.updateReferralPosting
);

// delete referral post (DELETE Method)
referralRouter.delete(
  "/post/:postId",
  authenticateUser,
  referralHandlers.deleteReferralPosting
);

export default referralRouter;
