import { finishGoogle } from "@/lib/oauth";

export async function GET(req: Request) {
  return finishGoogle(req);
}
