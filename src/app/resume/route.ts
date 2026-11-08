import { NextResponse } from "next/server";
import { FILE_REVALIDATE_TIME, getHome } from "@/lib/strapi";
import { getCmsImageUrl } from "@/lib/media-url";
import { SITE } from "@/site.config";

export async function GET() {
  try {
    const home = await getHome();
    const resume = home.resume;

    if (!resume?.url) {
      return new NextResponse("Resume file not found in CMS", {
        status: 404,
        headers: { "Content-Type": "text/plain; charset=utf-8" },
      });
    }

    const fileUrl = getCmsImageUrl(resume.url);
    const fetchHeaders: HeadersInit = {};
    if (process.env.CMS_TOKEN) {
      fetchHeaders.Authorization = `Bearer ${process.env.CMS_TOKEN}`;
    }

    const upstream = await fetch(fileUrl, {
      headers: fetchHeaders,
      next: {
        revalidate: FILE_REVALIDATE_TIME,
        tags: ["resume"],
      },
    });

    if (!upstream.ok || !upstream.body) {
      return new NextResponse("Failed to retrieve resume from storage", {
        status: 502,
        headers: { "Content-Type": "text/plain; charset=utf-8" },
      });
    }

    const contentType =
      resume.mime || upstream.headers.get("content-type") || "application/pdf";
    const filename =
      resume.name || `${SITE.name.replace(/[^a-zA-Z0-9_-]/g, "_")}_Resume.pdf`;

    const responseHeaders = new Headers();
    responseHeaders.set("Content-Type", contentType);
    responseHeaders.set(
      "Content-Disposition",
      `inline; filename="${filename}"`,
    );
    responseHeaders.set(
      "Cache-Control",
      `public, max-age=0, must-revalidate, s-maxage=3600, stale-while-revalidate=86400`,
    );

    const contentLength = upstream.headers.get("content-length");
    if (contentLength) {
      responseHeaders.set("Content-Length", contentLength);
    }

    return new NextResponse(upstream.body, {
      status: 200,
      headers: responseHeaders,
    });
  } catch (error) {
    console.error("Error serving resume:", error);
    return new NextResponse("Internal Server Error", {
      status: 500,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }
}
