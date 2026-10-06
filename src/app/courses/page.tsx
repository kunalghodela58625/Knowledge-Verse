import { listCourses } from "@/lib/courses";
import CatalogClient from "./CatalogClient";

export const dynamic = "force-dynamic";

export default async function CoursesPage() {
  const courses = await listCourses();
  return <CatalogClient courses={courses} />;
}
