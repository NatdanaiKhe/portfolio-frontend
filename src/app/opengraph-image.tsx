import { ImageResponse } from "next/og";
import { SITE } from "@/site.config";

export const alt = SITE.ogImageAlt;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          padding: "80px 100px",
          background: "#050505",
          fontFamily:
            'system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
        }}
      >
        {/* Top accent hairline */}
        <div
          style={{
            position: "absolute",
            top: 60,
            left: 100,
            right: 100,
            height: 1,
            background:
              "linear-gradient(90deg, #6366f1 0%, #6366f130 60%, transparent 100%)",
          }}
        />

        {/* Name */}
        <h1
          style={{
            fontSize: 72,
            fontWeight: 700,
            color: "#fafafa",
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
            margin: 0,
            marginBottom: 24,
          }}
        >
          {SITE.name}
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontSize: 32,
            fontWeight: 400,
            color: "#a1a1aa",
            margin: 0,
            marginBottom: 48,
          }}
        >
          {SITE.role}
        </p>

        {/* Bottom accent rule */}
        <div
          style={{
            width: 80,
            height: 3,
            background: "#6366f1",
            borderRadius: 2,
          }}
        />
      </div>
    ),
    {
      ...size,
    },
  );
}
