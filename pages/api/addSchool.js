import formidable from "formidable";
import fs from "fs";
import path from "path";
import { connectDB } from "../../lib/db";

export const config = {
  api: {
    bodyParser: false,
  },
};

const uploadDir = path.join(process.cwd(), "public", "schoolImages");

// ensure upload dir exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

function parseForm(req) {
  const form = new formidable.IncomingForm({
    multiples: false,
    keepExtensions: true,
    uploadDir,
  });
  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      else resolve({ fields, files });
    });
  });
}

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  try {
    const { fields, files } = await parseForm(req);

    const { name, address, city, state, contact, email_id } = fields;
    if (!name || !address || !city || !state || !contact || !email_id) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    let imagePath = null;
    if (files && files.image) {
      const file = files.image;
      // formidable may store file with a generated filename in uploadDir
      const filename = path.basename(file.filepath || file.path);
      imagePath = "/schoolImages/" + filename;
    }

    const db = await connectDB();
    const [result] = await db.execute(
      "INSERT INTO schools (name, address, city, state, contact, image, email_id) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [name, address, city, state, contact, imagePath, email_id]
    );

    return res.status(200).json({ message: "School added successfully", id: result.insertId });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error", details: err.message });
  }
}