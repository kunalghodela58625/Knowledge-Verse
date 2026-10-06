// Knowledgeverse database layer.
//
// - If MONGODB_URI is set, all tables live in MongoDB (required for Vercel,
//   whose filesystem is ephemeral and does not persist data/*.json).
// - Otherwise (local development without MongoDB) it falls back to the
//   original persistent JSON-file store in data/*.json.
//
// The exported API is identical for both backends, so routes need no changes.
import { promises as fs } from "fs";
import path from "path";
import { MongoClient, type Db } from "mongodb";

const DATA_DIR = path.join(process.cwd(), "data");

function useMongo(): boolean {
  return Boolean(process.env.MONGODB_URI);
}

// ---------- Mongo connection (cached across hot-reloads / serverless invocations) ----------
let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

async function mongoDb(): Promise<Db> {
  if (cachedDb) return cachedDb;
  const uri = process.env.MONGODB_URI!;
  const globalKey = "__kv_mongo_client";
  const g = globalThis as unknown as Record<string, MongoClient | undefined>;
  if (!g[globalKey]) {
    g[globalKey] = new MongoClient(uri);
    cachedClient = g[globalKey]!;
    await cachedClient.connect();
  } else {
    cachedClient = g[globalKey]!;
  }
  void cachedClient;
  cachedDb = g[globalKey]!.db(process.env.KV_DB_NAME || "knowledgeverse");
  return cachedDb;
}

// ---------- File fallback ----------
async function ensureDir() {
  await fs.mkdir(DATA_DIR, { recursive: true });
}

async function fileRead<T>(name: string, fallback: T): Promise<T> {
  await ensureDir();
  const file = path.join(DATA_DIR, `${name}.json`);
  try {
    const raw = await fs.readFile(file, "utf-8");
    return JSON.parse(raw) as T;
  } catch {
    await fs.writeFile(file, JSON.stringify(fallback, null, 2));
    return fallback;
  }
}

async function fileWrite<T>(name: string, data: T): Promise<void> {
  await ensureDir();
  const file = path.join(DATA_DIR, `${name}.json`);
  const tmp = path.join(DATA_DIR, `${name}.tmp.json`);
  await fs.writeFile(tmp, JSON.stringify(data, null, 2));
  await fs.rename(tmp, file);
}

// ---------- Generic table access ----------
async function readTable<T>(name: string, fallback: T[]): Promise<T[]> {
  if (!useMongo()) return fileRead<T[]>(name, fallback);
  const db = await mongoDb();
  const docs = await db.collection(name).find({}).toArray();
  return docs.map(({ _id, ...rest }) => rest as T);
}

async function writeTable<T>(name: string, data: T[]): Promise<void> {
  if (!useMongo()) return fileWrite(name, data);
  const db = await mongoDb();
  const col = db.collection(name);
  await col.deleteMany({});
  if (data.length > 0) await col.insertMany(data.map((d) => ({ ...(d as object) })));
}

// ---------- Entity types ----------
export interface User {
  id: string;
  fullName: string;
  email: string;
  passwordHash: string;
  role: "student" | "admin";
  createdAt: string;
  updatedAt: string;
}

export interface CustomCourse {
  id: string;
  title: string;
  description: string;
  duration: string;
  difficulty: string;
  category: string;
  thumbnail?: string;
  createdAt: string;
}

export interface CustomModule {
  id: string;
  courseId: string;
  title: string;
  description: string;
  order: number;
}

export interface CustomLesson {
  id: string;
  moduleId: string;
  courseId: string;
  title: string;
  description: string;
  videoUrl: string;
  estimatedMinutes: number;
  order: number;
}

export interface Enrollment {
  id: string;
  userId: string;
  courseId: string;
  enrolledAt: string;
  completed: boolean;
  completedAt: string | null;
  lastLessonId: string | null;
}

export interface LessonProgress {
  id: string;
  userId: string;
  courseId: string;
  lessonId: string;
  completed: boolean;
  completedAt: string | null;
}

export interface QuizAttempt {
  id: string;
  userId: string;
  quizId: string;
  courseId: string;
  score: number;
  total: number;
  percentage: number;
  answers: { questionId: string; selected: number; correct: boolean }[];
  attemptedAt: string;
}

export interface Certificate {
  id: string; // internal
  certificateId: string; // public unique e.g. KV-SE-8F42A91B
  userId: string;
  studentName: string;
  courseId: string;
  courseName: string;
  completionDate: string;
  issuedAt: string;
  status: "valid" | "revoked";
  verificationToken: string;
  qrDataUrl: string;
  // Completion facts shown on the certificate (never performance data).
  courseStats: { modules: number; lessons: number; duration: string };
}

export interface PasswordReset {
  email: string;
  token: string;
  expiresAt: number;
}

export const db = {
  async users(): Promise<User[]> {
    return readTable<User>("users", []);
  },
  async saveUsers(u: User[]) {
    return writeTable("users", u);
  },
  async courses(): Promise<CustomCourse[]> {
    return readTable<CustomCourse>("custom_courses", []);
  },
  async saveCourses(c: CustomCourse[]) {
    return writeTable("custom_courses", c);
  },
  async modules(): Promise<CustomModule[]> {
    return readTable<CustomModule>("custom_modules", []);
  },
  async saveModules(m: CustomModule[]) {
    return writeTable("custom_modules", m);
  },
  async lessons(): Promise<CustomLesson[]> {
    return readTable<CustomLesson>("custom_lessons", []);
  },
  async saveLessons(l: CustomLesson[]) {
    return writeTable("custom_lessons", l);
  },
  async enrollments(): Promise<Enrollment[]> {
    return readTable<Enrollment>("enrollments", []);
  },
  async saveEnrollments(e: Enrollment[]) {
    return writeTable("enrollments", e);
  },
  async progress(): Promise<LessonProgress[]> {
    return readTable<LessonProgress>("lesson_progress", []);
  },
  async saveProgress(p: LessonProgress[]) {
    return writeTable("lesson_progress", p);
  },
  async attempts(): Promise<QuizAttempt[]> {
    return readTable<QuizAttempt>("quiz_attempts", []);
  },
  async saveAttempts(a: QuizAttempt[]) {
    return writeTable("quiz_attempts", a);
  },
  async certificates(): Promise<Certificate[]> {
    return readTable<Certificate>("certificates", []);
  },
  async saveCertificates(c: Certificate[]) {
    return writeTable("certificates", c);
  },
  async resets(): Promise<PasswordReset[]> {
    return readTable<PasswordReset>("password_resets", []);
  },
  async saveResets(r: PasswordReset[]) {
    return writeTable("password_resets", r);
  },
};

export function uid(prefix = ""): string {
  return (
    prefix +
    Date.now().toString(36) +
    Math.random().toString(36).slice(2, 10)
  );
}
