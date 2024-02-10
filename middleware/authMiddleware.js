import jwt from "jsonwebtoken";
import pool from "../database/database.js";

export const authenticateUser = async (req, res, next) => {
  try {
    const bearerToken = req.headers.authorization;
    const token = bearerToken?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ error: "Unauthorized: No token provided" });
    }

    const decoded = jwt.verify(token, "your_secret_key");

    const userId = decoded.userId;
    console.log("userId", userId);
    const user = await pool.query("SELECT * FROM users WHERE id = $1", [
      userId,
    ]);

    if (!user.rows[0]) {
      return res.status(401).json({ error: "Unauthorized: Invalid token" });
    }

    req.user = {
      id: userId,
      email: user.rows[0].email,
      name: user.rows[0].name,
    };

    next();
  } catch (error) {
    console.error("Authentication error:", error);
    return res.status(401).json({ error: "Unauthorized: Invalid token" });
  }
};
