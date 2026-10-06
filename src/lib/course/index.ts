import { lessonsA, modulesA } from "./modules-a";
import { lessonsB, modulesB } from "./modules-b";
import type { CourseModule, Lesson } from "./types";

export const COURSE_ID = "software-engineering";

export const COURSE_META = {
  id: COURSE_ID,
  title: "Software Engineering",
  tagline: "From SDLC to UML: a complete guided path through software engineering",
  description:
    "Learn the fundamental concepts of Software Engineering through structured video lessons and companion written study material. The course follows the real software life cycle in order — foundations and SDLC, process models, requirements, project management and estimation, testing and quality, maintenance, and UML design — ending with guided revision and a final self-assessment. Every lesson pairs an embedded YouTube lecture with clear written explanations, examples, learning objectives and key takeaways.",
  difficulty: "Beginner to Intermediate",
  category: "Software Engineering",
  code: "SE", // used in certificate IDs: KV-SE-XXXXXX
};

export const COURSE_MODULES: CourseModule[] = [...modulesA, ...modulesB];

const lessonMap = new Map<string, Lesson>();
for (const l of [...lessonsA, ...lessonsB]) lessonMap.set(l.id, l);

export const ALL_LESSONS: Lesson[] = [...lessonsA, ...lessonsB];

export function getLesson(id: string): Lesson | undefined {
  return lessonMap.get(id);
}

export function getModule(id: string): CourseModule | undefined {
  return COURSE_MODULES.find((m) => m.id === id);
}

export function moduleLessons(moduleId: string): Lesson[] {
  const m = getModule(moduleId);
  if (!m) return [];
  return m.lessonIds
    .map((id) => lessonMap.get(id))
    .filter((l): l is Lesson => Boolean(l));
}

export const TOTAL_LESSONS = ALL_LESSONS.length;

export const TOTAL_MINUTES = ALL_LESSONS.reduce(
  (s, l) => s + l.estimatedMinutes,
  0
);

export function formatDuration(): string {
  const h = Math.round(TOTAL_MINUTES / 60);
  return `≈ ${h} hours`;
}

// Ordered flat list for prev/next navigation
export function orderedLessons(): Lesson[] {
  const out: Lesson[] = [];
  for (const m of COURSE_MODULES) out.push(...moduleLessons(m.id));
  return out;
}

export function neighbours(lessonId: string): {
  prev: Lesson | null;
  next: Lesson | null;
  index: number;
} {
  const list = orderedLessons();
  const index = list.findIndex((l) => l.id === lessonId);
  return {
    prev: index > 0 ? list[index - 1] : null,
    next: index >= 0 && index < list.length - 1 ? list[index + 1] : null,
    index,
  };
}
