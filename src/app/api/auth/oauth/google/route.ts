import { startGoogle } from "@/lib/oauth";

export async function GET(req: Request) {
  return startGoogle(req);
}
