# Knowledgeverse — Operating Guide

Complete guide to run, use and manage the Knowledgeverse online learning platform.

## 1. What was built

A full-stack Next.js (App Router) application with a JSON-file persistent database
(`data/*.json`, created automatically on first run):

- Landing page, course catalog with search + difficulty filter, course details
- Registration / login / logout / forgot-password / reset-password (bcrypt hashing, JWT httpOnly cookie sessions)
- Student dashboard (in-progress, completed, certificates, quiz history), profile page
- Software Engineering course: **8 modules, 59 lessons, ≈27 hours**, every lesson with
  embedded YouTube video + written notes + objectives + takeaways + Mark-as-Complete
- Progress tracking saved server-side; sidebar learning interface (collapsible on mobile)
- Final assessment quiz (40 questions, server-graded, answers never leak to client)
- **Certificate rules exactly as specified:** 100% lesson completion is the ONLY
  requirement — no quiz-score, watch-time or study-time conditions anywhere
- Professional Certificate of Completion with the provided PNG signature
  (`public/signature.png`), unique ID (`KV-SE-XXXXXXXX`), QR code → `/verify/[id]`,
  PDF download (jsPDF), server-side verification, revoke/restore
- Admin dashboard: stats, students, course/module/lesson CRUD (for future courses),
  certificate revoke/restore, quiz-attempt review
- Fully responsive (mobile drawer sidebar, touch-friendly buttons)

## 2. Run the application

Requirements: Node.js 18+.

```bash
cd /mnt/e/Kunal/Desktop/Knowledgeverse
npm install
npm run dev      # development  -> http://localhost:3000
# or
npm run build && npm start   # production -> http://localhost:3000
```

First run creates the `data/` folder (student records) when `MONGODB_URI` is not
set. It is git-ignored. For production hosting on Vercel, follow
`DEPLOY_VERCEL.md` (MongoDB Atlas + environment variables).

Optional environment variables (create a `.env.local` file):

| Variable            | Purpose |
|---------------------|---------|
| `KV_JWT_SECRET`     | JWT signing secret (set a long random value in production) |
| `MONGODB_URI`     | MongoDB connection string. When set, ALL records live in MongoDB (required on Vercel); when absent, local `data/*.json` files are used |
| `KV_DB_NAME`        | Mongo database name (default `knowledgeverse`) |
| `KV_PUBLIC_URL`     | Public base URL embedded in certificate QR codes (default: request origin) |
| `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` | Google OAuth credentials for "Continue with Google" (setup: DEPLOY_VERCEL.md Step 3b). Without these, email+password sign-up/login still works |
| `KV_ALLOW_HTTP=1`   | Allow login cookies over plain HTTP (needed for LAN/self-host without HTTPS; localhost and HTTPS deployments don't need it) |
| `KV_ADMIN_EMAIL` / `KV_ADMIN_PASSWORD` | Override default admin credentials |

## 3. Accounts

- **Admin (auto-created on first auth request):** `admin@knowledgeverse.com` / `Admin123!`
- **Students:** self-register at `/register` with name + email + password, or
  one-click via **Continue with Google** (needs `GOOGLE_CLIENT_ID/SECRET`;
  Google verifies the email, and the Google profile name is used on certificates).
  The account's full name is stored and later printed on certificates.

## 4. Student journey (matches the required flow)

1. Visit `/` → **Get Started** → create account → login
2. **Explore Courses** → open *Software Engineering* → **Enroll Now**
3. **Start Learning**: watch videos (optional), read notes, click **Mark as Complete ✓**
4. Progress bar + dashboard update; leave and resume anytime, on any device
5. At 100% the course shows **Completed ✓** and the certificate is issued automatically
6. **My Certificates** → View → **Download Certificate (PDF)** → share; anyone scanning
   the QR lands on `/verify/[certificate-id]` showing the verified record
7. Optional: take the 40-question final quiz at any time for self-assessment

## 5. Course design notes (20–30 hour requirement)

- Your 62 supplied video entries contained 4 exact URL duplicates, so the course uses
  the **58 unique videos as 58 lessons**, plus 1 capstone wrap-up lesson = **59 lessons**
  in **8 modules** (RAD merged into Process Models; estimation merged into Project
  Management; Performance/Regression live with Testing).
- Each lesson = video (~10–18 min) + written study (≈15–20 min) → **1639 min ≈ 27 hours**.
- Completing is intentionally easy: one **Mark as Complete** click per lesson, no
  forced watching, no quiz barrier — exactly per your rules.

## 6. Adding future courses (no code changes needed)

Login as admin → **Admin → Courses tab → Add a new course**, then add modules and
lessons (YouTube URLs accepted; video IDs are extracted automatically). New courses
instantly appear in the catalog with enrollment, progress, and certificate support.

## 7. Verification & security summary

- Passwords hashed with bcrypt (12 rounds); sessions are signed JWTs in httpOnly cookies
- Completion re-validated server-side before any certificate is issued; the student
  name is taken from the account, never from client input
- Quiz answer key lives only on the server (`src/lib/quizData.ts`); the client
  receives questions without answers
- Certificate IDs are random (`crypto.randomBytes`) and unguessable; verification
  reads from the backend database; revoked certificates show "Certificate Not Found"
- Admin routes check `role === "admin"` on the server for every request

## 8. Troubleshooting

| Symptom | Fix |
|---------|-----|
| Login works on localhost but not over LAN http | Set `KV_ALLOW_HTTP=1` (or serve over HTTPS) |
| `lightningcss … .node` missing build error | `npm install --no-save lightningcss-linux-x64-gnu` then copy the `.node` file into `node_modules/lightningcss/` |
| Forgot password email never arrives | No SMTP is configured by design — the forgot-password page shows the reset link directly after submitting |
| Reset test data | Stop the server and delete `data/*.json` |
