# Deploying Knowledgeverse to Vercel (with MongoDB Atlas)

Everything is already code-ready. You only need to connect the pieces below.
Estimated time: ~15 minutes.

## Prerequisites

- A GitHub account
- A Vercel account (sign up with GitHub at https://vercel.com)
- Your MongoDB Atlas cluster (already created)

## Step 1 — Allow Vercel to reach MongoDB (2 min)

Vercel uses dynamic IP addresses, so Atlas must accept connections from anywhere:

1. Open https://cloud.mongodb.com → your project → **Network Access** (left sidebar)
2. Click **Add IP Address** → **Allow Access from Anywhere** (`0.0.0.0/0`) → Confirm
3. Go to **Database Access** and confirm your database user exists:
   - Username: `kg26012026_db_user`
   - It needs the **readWrite** role on the database (built-in `readWriteAnyDatabase` or a custom role also works)

No need to create collections manually — the app creates
`users, custom_courses, custom_modules, custom_lessons, enrollments,
lesson_progress, quiz_attempts, certificates, password_resets`
automatically on first write, inside the `knowledgeverse` database.

## Step 2 — Push the code to GitHub (3 min)

```bash
cd /mnt/e/Kunal/Desktop/Knowledgeverse
git add -A
git commit -m "Knowledgeverse: Vercel + MongoDB ready"
git branch -M main
git remote add origin https://github.com/<your-username>/knowledgeverse.git
git push -u origin main
```

(If you already have a repo, just commit and push.)

## Step 3 — Import the project in Vercel (3 min)

1. Go to https://vercel.com/new → **Import** your `knowledgeverse` repository
2. Framework is auto-detected as **Next.js** — leave Build Command (`next build`)
   and Output Directory (default) untouched
3. **Before clicking Deploy**, open **Environment Variables** and add:

| Name | Value |
|------|-------|
| `MONGODB_URI` | `mongodb+srv://kg26012026_db_user:uYIDw6NVSbkYkCd1@cluster0.b6dz8le.mongodb.net/` |
| `KV_JWT_SECRET` | a long random string, e.g. output of `openssl rand -base64 48` |
| `KV_PUBLIC_URL` | `https://<your-project>.vercel.app` (after first deploy; see step 5) |
| `KV_ADMIN_EMAIL` | (optional) admin email, default `admin@knowledgeverse.com` |
| `KV_ADMIN_PASSWORD` | (optional) admin password, default `Admin123!` — **change this** |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID (see Step 3b below) |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret (see Step 3b below) |

> Set each variable for **Production** (and Preview if you want previews to share the DB).
> `MONGODB_URI` is what switches the app from local JSON files to MongoDB —
> without it, logins on Vercel would silently "forget" users (ephemeral filesystem).

4. Click **Deploy**

## Step 3b — Enable "Continue with Google" (5 min)

Students can sign up / log in with their Google account. You need a Google
OAuth client (one-time setup, free):

1. Go to https://console.cloud.google.com → create (or select) a project
2. **APIs & Services → OAuth consent screen**:
   - User type: **External** → Create
   - Fill App name (`Knowledgeverse`), User support email, Developer contact email → Save
   - Skip Scopes, then under **Test users** add your own Gmail address (required
     while the app is in Testing mode) → Save
3. **APIs & Services → Credentials → Create Credentials → OAuth client ID**:
   - Application type: **Web application**, name `Knowledgeverse Web`
   - Under **Authorized redirect URIs** add BOTH:
     - `http://localhost:3000/api/auth/oauth/google/callback` (local testing)
     - `https://<your-project>.vercel.app/api/auth/oauth/google/callback` (production; update after deploy/rename, and for any custom domain)
   - Create → copy the **Client ID** and **Client Secret**
4. Add them as Vercel environment variables: `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`
5. Locally, put the same two values in a `.env.local` file:
   ```
   GOOGLE_CLIENT_ID=xxxx.apps.googleusercontent.com
   GOOGLE_CLIENT_SECRET=xxxx
   ```
6. When ready for the public, click **Publish App** on the OAuth consent screen
   (otherwise only your Test users can sign in with Google).

How it works: Google verifies the email address, so no OTP is needed — the
student clicks "Continue with Google", approves, and the account is created
(full name taken from the Google profile, which is then used on certificates)
or matched to the existing account with the same email.

## Step 4 — Verify the deployment (5 min)

1. Open the Vercel URL, e.g. `https://knowledgeverse-xyz.vercel.app`
2. Register a student account at `/register`
3. Enroll in **Software Engineering**, complete a lesson, reload — progress must persist
   (this proves MongoDB is connected; check Atlas → **Browse Collections** to see documents)
4. Login at `/login` with `admin@knowledgeverse.com` / your admin password → `/admin`
   should show 1 student
5. Complete the course (or use a 1-lesson test course from the admin panel) and confirm
   the certificate page, PDF download and `/verify/[id]` page all work

## Step 5 — Set the public URL (1 min, important for QR codes)

Certificate QR codes embed the verification URL. After the first deploy:

1. Copy your production domain from the Vercel dashboard
2. Vercel → Project → **Settings → Environment Variables** → set
   `KV_PUBLIC_URL` = `https://your-domain.vercel.app` (or your custom domain)
3. **Redeploy** (Deployments → ⋯ → Redeploy) so the variable takes effect

## Step 6 (optional) — Custom domain

Vercel → Project → **Settings → Domains** → add your domain and follow the DNS
instructions. Update `KV_PUBLIC_URL` to match and redeploy.

## Troubleshooting

| Symptom | Cause / Fix |
|---------|-------------|
| Users "disappear" after login / 500 on API routes | `MONGODB_URI` missing or wrong → check env vars; check Atlas Network Access allows `0.0.0.0/0` |
| `bad auth` / `authentication failed` in Vercel logs | Wrong DB username/password or user lacks readWrite role |
| QR code points to the wrong domain | Set/redeploy with correct `KV_PUBLIC_URL` |
| `ENV` changes not taking effect | You must **Redeploy** after changing environment variables |
| Build fails on Vercel but works locally | Check the build log; Node version is auto-selected (18+ required) — ` engines` are not pinned, which is intentional |

## Local development with MongoDB (optional)

To use Atlas locally instead of JSON files:

```bash
MONGODB_URI='mongodb+srv://kg26012026_db_user:uYIDw6NVSbkYkCd1@cluster0.b6dz8le.mongodb.net/' npm run dev
```

Without `MONGODB_URI`, the app uses `data/*.json` files (git-ignored).
