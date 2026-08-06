import { revalidatePath } from "next/cache";
import { timingSafeEqual } from "node:crypto";
import type { NextRequest } from "next/server";

function constantTimeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) {
    // prevent timing leak: still run a dummy compare
    const dummy = Buffer.alloc(a.length || b.length || 1);
    try {
      timingSafeEqual(
        Buffer.from(a.slice(0, dummy.length)),
        Buffer.from(b.slice(0, dummy.length)),
      );
    } catch {
      // intentionally ignored
    }
    return false;
  }
  return timingSafeEqual(Buffer.from(a), Buffer.from(b));
}

function extractSecret(
  request: NextRequest,
  body?: { secret?: string },
): string | null {
  // POST body takes precedence
  if (body?.secret) return body.secret;
  // GET query param fallback
  return request.nextUrl.searchParams.get("secret");
}

export async function GET(request: NextRequest) {
  return handleRequest(request);
}

export async function POST(request: NextRequest) {
  let body: { secret?: string; path?: string } | undefined;
  try {
    body = await request.json();
  } catch {
    return Response.json(
      { revalidated: false, message: "Invalid JSON body" },
      { status: 400 },
    );
  }
  return handleRequest(request, body);
}

async function handleRequest(
  request: NextRequest,
  body?: { secret?: string; path?: string },
) {
  const secret = extractSecret(request, body);
  const expected = process.env.REVALIDATE_SECRET;

  if (!expected || !secret || !constantTimeEqual(secret, expected)) {
    return Response.json(
      { revalidated: false, message: "Invalid secret" },
      { status: 401 },
    );
  }

  const path = body?.path ?? request.nextUrl.searchParams.get("path") ?? "/";

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

// Reject unsupported methods
export async function PUT() {
  return new Response("Method Not Allowed", { status: 405 });
}
export async function DELETE() {
  return new Response("Method Not Allowed", { status: 405 });
}
export async function PATCH() {
  return new Response("Method Not Allowed", { status: 405 });
}
