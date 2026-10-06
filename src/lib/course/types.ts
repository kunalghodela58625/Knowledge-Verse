// Shared course types + helpers for Knowledgeverse.
export interface LessonSection {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface Lesson {
  id: string;
  moduleId: string;
  title: string;
  videoId: string;
  videoTitle: string;
  videoDuration: string;
  estimatedMinutes: number;
  description: string;
  objectives: string[];
  sections: LessonSection[];
  keyTakeaways: string[];
}

export interface CourseModule {
  id: string;
  title: string;
  description: string;
  objectives: string[];
  lessonIds: string[];
}

export const ytEmbed = (videoId: string) =>
  `https://www.youtube.com/embed/${videoId}`;

export const ytWatch = (videoId: string) =>
  `https://www.youtube.com/watch?v=${videoId}`;
