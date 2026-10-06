import { db } from "./db";
import {
  ALL_LESSONS,
  COURSE_ID,
  COURSE_META,
  COURSE_MODULES,
  TOTAL_LESSONS,
  TOTAL_MINUTES,
  formatDuration,
  moduleLessons,
} from "./course";

export interface UnifiedLesson {
  id: string;
  moduleId: string;
  title: string;
  description: string;
  videoId: string | null;
  videoUrl: string | null;
  videoDuration: string | null;
  estimatedMinutes: number;
  objectives: string[];
  // built-in only extras
  sections?: { heading: string; paragraphs: string[]; bullets?: string[] }[];
  keyTakeaways?: string[];
}

export interface UnifiedModule {
  id: string;
  title: string;
  description: string;
  objectives: string[];
  lessons: UnifiedLesson[];
  estimatedMinutes: number;
}

export interface UnifiedCourse {
  id: string;
  title: string;
  description: string;
  duration: string;
  difficulty: string;
  category: string;
  builtIn: boolean;
  totalLessons: number;
  totalModules: number;
  totalMinutes: number;
  modules: UnifiedModule[];
  code: string;
}

function ytId(url: string): string | null {
  const m = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]{6,})/);
  return m ? m[1] : null;
}

export async function getCourse(courseId: string): Promise<UnifiedCourse | null> {
  if (courseId === COURSE_ID) {
    const modules: UnifiedModule[] = COURSE_MODULES.map((m) => {
      const lessons = moduleLessons(m.id);
      return {
        id: m.id,
        title: m.title,
        description: m.description,
        objectives: m.objectives,
        estimatedMinutes: lessons.reduce((s, l) => s + l.estimatedMinutes, 0),
        lessons: lessons.map((l) => ({
          id: l.id,
          moduleId: l.moduleId,
          title: l.title,
          description: l.description,
          videoId: l.videoId,
          videoUrl: `https://www.youtube.com/watch?v=${l.videoId}`,
          videoDuration: l.videoDuration,
          estimatedMinutes: l.estimatedMinutes,
          objectives: l.objectives,
          sections: l.sections,
          keyTakeaways: l.keyTakeaways,
        })),
      };
    });
    return {
      id: COURSE_ID,
      title: COURSE_META.title,
      description: COURSE_META.description,
      duration: formatDuration(),
      difficulty: COURSE_META.difficulty,
      category: COURSE_META.category,
      builtIn: true,
      totalLessons: TOTAL_LESSONS,
      totalModules: modules.length,
      totalMinutes: TOTAL_MINUTES,
      modules,
      code: COURSE_META.code,
    };
  }
  const courses = await db.courses();
  const c = courses.find((x) => x.id === courseId);
  if (!c) return null;
  const [mods, les] = await Promise.all([db.modules(), db.lessons()]);
  const myMods = mods
    .filter((m) => m.courseId === courseId)
    .sort((a, b) => a.order - b.order);
  const modules: UnifiedModule[] = myMods.map((m) => {
    const ml = les
      .filter((l) => l.moduleId === m.id)
      .sort((a, b) => a.order - b.order);
    return {
      id: m.id,
      title: m.title,
      description: m.description,
      objectives: [],
      estimatedMinutes: ml.reduce((s, l) => s + l.estimatedMinutes, 0),
      lessons: ml.map((l) => ({
        id: l.id,
        moduleId: l.moduleId,
        title: l.title,
        description: l.description,
        videoId: l.videoUrl ? ytId(l.videoUrl) : null,
        videoUrl: l.videoUrl || null,
        videoDuration: null,
        estimatedMinutes: l.estimatedMinutes,
        objectives: [],
      })),
    };
  });
  const totalLessons = modules.reduce((s, m) => s + m.lessons.length, 0);
  return {
    id: c.id,
    title: c.title,
    description: c.description,
    duration: c.duration,
    difficulty: c.difficulty,
    category: c.category,
    builtIn: false,
    totalLessons,
    totalModules: modules.length,
    totalMinutes: modules.reduce((s, m) => s + m.estimatedMinutes, 0),
    modules,
    code: c.title.slice(0, 2).toUpperCase().replace(/[^A-Z]/g, "X") || "KV",
  };
}

export async function listCourses(): Promise<UnifiedCourse[]> {
  const builtin = (await getCourse(COURSE_ID))!;
  const customs = await db.courses();
  const out = [builtin];
  for (const c of customs) {
    const full = await getCourse(c.id);
    if (full) out.push(full);
  }
  return out;
}

export function lessonIdsOf(course: UnifiedCourse): string[] {
  return course.modules.flatMap((m) => m.lessons.map((l) => l.id));
}

// Quiz registry: built-in final quiz for SE; admin-managed quizzes could extend.
export function courseQuizId(courseId: string): string | null {
  if (courseId === COURSE_ID) return "se-final";
  return null;
}

export { ALL_LESSONS };
