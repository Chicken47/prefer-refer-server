import pool from "../database/database.js";

export const createReferralPosting = async (req, res) => {
  const {
    title,
    description,
    tech_stack_required,
    yoe_required,
    work_location,
    company_rating,
  } = req.body;
  const userId = req.user.id;
  console.log("requestBody", req.user);
  try {
    const newReferralPosting = await pool.query(
      "INSERT INTO referral_postings (user_id, title, yoe_required, work_location, description, company_rating, tech_stack_required) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [
        userId,
        title,
        yoe_required,
        work_location,
        description,
        company_rating,
        tech_stack_required,
      ]
    );

    res.status(201).json(newReferralPosting.rows[0]);
  } catch (error) {
    console.error("Error creating referral posting:", error);
    res.status(500).json({
      error: `An error occurred while creating the referral posting: ${error}`,
    });
  }
};

export const getAllReferralPostings = async (_, res) => {
  try {
    const referralPostings = await pool.query(
      "SELECT * FROM referral_postings"
    );
    res.json(referralPostings.rows);
  } catch (error) {
    console.error("Error fetching referral postings:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getReferralPostingById = async (req, res) => {
  const postId = req.params.postId;

  try {
    const referralPosting = await pool.query(
      "SELECT * FROM referral_postings WHERE id = $1",
      [postId]
    );

    if (referralPosting.rows.length === 0) {
      return res.status(404).json({ error: "Referral posting not found" });
    }

    res.json(referralPosting.rows[0]);
  } catch (error) {
    console.error("Error fetching referral posting:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateReferralPosting = async (req, res) => {
  const postId = req.params.postId;
  const {
    title,
    description,
    techStackRequired,
    yoeRequired,
    workLocation,
    companyRating,
  } = req.body;

  try {
    const updatedReferralPosting = await pool.query(
      "UPDATE referral_postings SET title = $1, description = $2, tech_stack_required = $3, yoe_required = $4, work_location = $5, company_rating = $6 WHERE id = $7 RETURNING *",
      [
        title,
        description,
        techStackRequired,
        yoeRequired,
        workLocation,
        companyRating,
        postId,
      ]
    );

    if (updatedReferralPosting.rows.length === 0) {
      return res.status(404).json({ error: "Referral posting not found" });
    }

    res.json(updatedReferralPosting.rows[0]);
  } catch (error) {
    console.error("Error updating referral posting:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteReferralPosting = async (req, res) => {
  const postId = req.params.postId;

  try {
    const deletedReferralPosting = await pool.query(
      "DELETE FROM referral_postings WHERE id = $1 RETURNING *",
      [postId]
    );

    if (deletedReferralPosting.rows.length === 0) {
      return res.status(404).json({ error: "Referral posting not found" });
    }

    res.json({ message: "Referral posting deleted successfully" });
  } catch (error) {
    console.error("Error deleting referral posting:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getAllReferralPostingsByUser = async (req, res) => {
  const userId = req.user.id; // Get the user ID from the authenticated user

  try {
    const referralPostings = await pool.query(
      "SELECT * FROM referral_postings WHERE user_id = $1",
      [userId]
    );
    res.json(referralPostings.rows);
  } catch (error) {
    console.error("Error fetching referral postings by user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
