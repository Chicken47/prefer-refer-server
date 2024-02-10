import pkg from "pg";
import "dotenv/config";

const { Pool } = pkg;
const pool = new Pool({
  host: "localhost",
  port: 5432,
  user: "postgres",
  database: "prefer_refer",
  password: "akshitpostgres",
});

pool.connect((err) => {
  if (err) throw err;
  console.log("Connected to PostgreSQL successfully!");
});

export default pool;
