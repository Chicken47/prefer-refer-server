import pool from "../database/database.js";

/*
    id (serial)
    referral_posting_id (take from params)
    user_id (take from middleware)
    name (take from middleware)
    email (take from middleware)
    resume_file (body)
    resume name (body)
    cover_letter (body)
    linkedIn profile (body)
    portfolio url (body)
    other links (body)
    tech_stack (body)
    years_of_experience (body)
*/

export const applyToReferralPosting = async (req, res) => {
  const {
    resume_file,
    resume_file_name,
    cover_letter,
    linkedin_profile_url,
    portfolio_url,
    other_link,
    tech_stack,
    years_of_experience,
  } = req.body;
  const { post_id } = req.params;
  const { id, email, name } = req.user;
  console.log("Middleware \n", post_id);
  try {
    const existingApplication = await pool.query(
      "SELECT * FROM referral_appliers WHERE referral_posting_id = $1 AND user_id = $2",
      [post_id, id]
    );

    if (existingApplication.rows.length > 0) {
      return res.status(400).json({
        error: "User has already applied to this referral posting",
      });
    }

    await pool.query(
      "INSERT INTO referral_appliers (referral_posting_id, user_id, name, email, resume_file, resume_file_name, cover_letter, linkedin_profile_url, portfolio_url, other_link, tech_stack, years_of_experience) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)",
      [
        post_id,
        id,
        name,
        email,
        resume_file,
        resume_file_name,
        cover_letter,
        linkedin_profile_url,
        portfolio_url,
        other_link,
        tech_stack,
        years_of_experience,
      ]
    );

    return res
      .status(201)
      .json({ message: "Application submitted successfully" });
  } catch (error) {
    console.error("Error applying to referral posting:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getApplicationsByUserId = async (req, res) => {
  const { id } = req.user;
  try {
    const applications = await pool.query(
      "SELECT * FROM referral_appliers WHERE user_id = $1",
      [id]
    );

    return res.status(200).json(applications.rows);
  } catch (error) {
    console.error("Error selecting applications by user ID:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getApplicationsByPostingId = async (req, res) => {
  const { postId } = req.params;

  try {
    const applications = await pool.query(
      "SELECT * FROM referral_appliers WHERE referral_posting_id = $1",
      [postId]
    );

    return res.status(200).json(applications.rows);
  } catch (error) {
    console.error(
      "Error selecting applications by referral posting ID:",
      error
    );
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
