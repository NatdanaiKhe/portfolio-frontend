import type { MetadataRoute } from "next";
import { SITE } from "@/site.config";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE.name} — Portfolio`,
    short_name: "N. Khemthong",
    description: SITE.description,
    start_url: "/",
    display: "standalone",
    background_color: "#050505",
    theme_color: "#050505",
    icons: [
      { src: "/logo.svg", sizes: "any", type: "image/svg+xml", purpose: "any" },
      {
        src: "/logo.png",
        sizes: "500x500",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/logo_main.png",
        sizes: "500x500",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
