import { revalidatePath } from "next/cache";
import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const secret = searchParams.get("secret");
  const path = searchParams.get("path") ?? "/";

  if (secret !== process.env.REVALIDATE_SECRET) {
    return Response.json(
      { revalidated: false, message: "Invalid secret" },
      { status: 401 },
    );
  }

  if (!path) {
    return Response.json(
      { revalidated: false, message: "Missing path parameter" },
      { status: 400 },
    );
  }

  try {
    revalidatePath(path);
    return Response.json({ revalidated: true, path });
  } catch (err) {
    return Response.json(
      {
        revalidated: false,
        message: err instanceof Error ? err.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
