import { db } from "./db";
import { hashPassword } from "./auth";

// Lazily ensures the default admin account exists.
export async function ensureAdmin() {
  const users = await db.users();
  const email = process.env.KV_ADMIN_EMAIL || "admin@knowledgeverse.com";
  if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) return;
  const password = process.env.KV_ADMIN_PASSWORD || "Admin123!";
  users.push({
    id: "admin-" + Date.now().toString(36),
    fullName: "Knowledgeverse Admin",
    email,
    passwordHash: await hashPassword(password),
    role: "admin",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });
  await db.saveUsers(users);
}
