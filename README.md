# School App - Web Development Assignment

This is a complete, ready-to-deploy Next.js project for the School Directory assignment.

## What is included
- `pages/addSchool.jsx` — form page using `react-hook-form` with validation and image upload.
- `pages/showSchools.jsx` — responsive grid display of schools (name, address, city, image).
- `pages/api/addSchool.js` — API route that accepts multipart/form-data, saves image to `public/schoolImages`, and inserts record into MySQL.
- `pages/api/getSchools.js` — API route to fetch schools.
- `lib/db.js` — simple MySQL connection using `mysql2/promise`.
- SQL script `init.sql` to create the database and `schools` table.

## Setup (local)

1. Install dependencies
```bash
npm install
```

2. Create `.env.local` in project root with:
```
DB_HOST=localhost
DB_USER=root
DB_PASS=yourpassword
DB_NAME=school_db
```

3. Create the `schoolImages` folder and add a `.gitkeep`:
```bash
mkdir -p public/schoolImages
touch public/schoolImages/.gitkeep
```

4. Run the SQL script `init.sql` to create database & table.

5. Start dev server:
```bash
npm run dev
```

## Deploy
- Recommended: Vercel. Set environment variables (`DB_HOST`, `DB_USER`, `DB_PASS`, `DB_NAME`) in Vercel project settings.

## Notes
- The API uses `formidable` to parse file uploads and saves images to `public/schoolImages`.
- For production, consider using an object storage (S3) and secure database connection.