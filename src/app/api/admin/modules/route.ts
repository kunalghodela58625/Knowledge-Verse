import { NextResponse } from "next/server";
import { db, uid } from "@/lib/db";
import { requireAdmin } from "../_guard";

// Modules: POST { courseId, title, description } / PUT { id, ... } / DELETE?id=
export async function POST(req: Request) {
  const g = await requireAdmin();
  if (g.error) return g.error;
  const b = await req.json();
  if (!b.courseId || !String(b.title || "").trim())
    return NextResponse.json({ error: "Course and title are required." }, { status: 400 });
  const modules = await db.modules();
  const order = modules.filter((m) => m.courseId === b.courseId).length;
  const m = { id: uid("m_"), courseId: b.courseId, title: String(b.title).trim(), description: String(b.description || ""), order };
  modules.push(m);
  await db.saveModules(modules);
  return NextResponse.json({ module: m });
}

export async function PUT(req: Request) {
  const g = await requireAdmin();
  if (g.error) return g.error;
  const b = await req.json();
  const modules = await db.modules();
  const m = modules.find((x) => x.id === b.id);
  if (!m) return NextResponse.json({ error: "Module not found." }, { status: 404 });
  if (b.title !== undefined) m.title = String(b.title);
  if (b.description !== undefined) m.description = String(b.description);
  await db.saveModules(modules);
  return NextResponse.json({ module: m });
}

export async function DELETE(req: Request) {
  const g = await requireAdmin();
  if (g.error) return g.error;
  const id = new URL(req.url).searchParams.get("id") || "";
  await db.saveModules((await db.modules()).filter((m) => m.id !== id));
  await db.saveLessons((await db.lessons()).filter((l) => l.moduleId !== id));
  return NextResponse.json({ ok: true });
}
