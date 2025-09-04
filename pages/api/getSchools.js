import { connectDB } from "../../lib/db";

export default async function handler(req, res) {
  try {
    const db = await connectDB();
    // return last 200 rows (safeguard)
    const [rows] = await db.execute("SELECT id, name, address, city, image FROM schools ORDER BY id DESC LIMIT 200");
    res.status(200).json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error", details: err.message });
  }
}