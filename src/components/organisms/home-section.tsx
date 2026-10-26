import Image from "next/image";
import { Circle } from "lucide-react";
import {
  BlocksRenderer,
  type BlocksContent,
} from "@strapi/blocks-react-renderer";
import type { HomeData } from "@/types";
import { CTAButton } from "@/components/atoms/cta-button";
import { getCmsImageUrl } from "@/lib/media-url";
import { extractTextFromBlocks } from "@/lib/utils";

export interface HomeSectionProps {
  homeData: HomeData;
}

export function HomeSection({ homeData }: HomeSectionProps) {
  return (
    <section
      id="home"
      aria-labelledby="home-title"
      className="flex min-h-[100dvh] w-full flex-col items-center justify-center px-6 pt-20 pb-16 md:px-12 lg:px-24"
    >
      <div className="mx-auto flex w-full max-w-[1280px] flex-col items-center justify-center gap-12 md:flex-row md:gap-16 lg:gap-24">
        <div className="flex max-w-lg flex-col items-start">
          <h1
            id="home-title"
            className="text-text text-4xl leading-[1.1] font-bold tracking-tighter md:text-5xl lg:text-6xl"
          >
            {Array.isArray(homeData.role) ? (
              <BlocksRenderer
                content={homeData.role as unknown as BlocksContent}
                blocks={{
                  paragraph: ({ children }) => (
                    <span className="block">{children}</span>
                  ),
                  heading: ({ children }) => (
                    <span className="block">{children}</span>
                  ),
                }}
              />
            ) : typeof homeData.role === "string" ? (
              homeData.role.split("\n").map((line, i) => (
                <span key={i} className="block">
                  {line}
                </span>
              ))
            ) : (
              <>
                <span className="block">Software</span>
                <span className="block">Developer</span>
              </>
            )}
          </h1>

          <p className="text-text-muted mt-6 max-w-md text-base leading-relaxed md:text-lg">
            {typeof homeData.hero_text === "string"
              ? homeData.hero_text
              : Array.isArray(homeData.hero_text)
                ? extractTextFromBlocks(homeData.hero_text)
                : ""}
          </p>

          <div className="mt-8 flex items-center gap-4">
            <CTAButton href="#projects" variant="default">
              View Projects
            </CTAButton>
            <CTAButton href="#contact" variant="secondary" showArrow={false}>
              Get in touch
            </CTAButton>
          </div>
        </div>

        <div className="relative">
          <div className="border-text/[0.06] bg-text/[0.02] rounded-[2rem] border p-1.5 shadow-[inset_0_1px_0_var(--surface-highlight)]">
            <div className="relative overflow-hidden rounded-[calc(2rem-0.375rem)]">
              <Image
                src={
                  homeData.profile_image?.url
                    ? getCmsImageUrl(homeData.profile_image.url)
                    : "/logo.svg"
                }
                alt="Natdanai Khemthong - Full-Stack Developer profile photo"
                width={400}
                height={400}
                sizes="(max-width: 768px) 256px, 320px"
                className="h-64 w-64 object-cover md:h-80 md:w-80"
                priority
                fetchPriority="high"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          <div className="border-text/[0.08] bg-bg-subtle absolute -right-2 -bottom-2 flex items-center gap-2 rounded-full border px-4 py-2 shadow-lg">
            <Circle
              className={`h-2.5 w-2.5 ${
                homeData.available_status
                  ? "animate-pulse text-emerald-400"
                  : "text-red-400"
              }`}
              fill={homeData.available_status ? "#34d399" : "#f87171"}
            />
            <span className="text-text-muted text-xs font-medium">
              {homeData.available_status
                ? "Available for work"
                : "Not available"}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-8 flex w-full max-w-4xl flex-col items-center justify-between gap-3 border-t border-white/[0.06] pt-6 text-center sm:flex-row sm:text-left">
        <span className="text-text-faint text-xs font-medium">
          Previously building with teams at
        </span>
        <div className="flex flex-wrap items-center justify-center gap-2">
          <a
            href="#experience"
            className="bg-bg-elevated/70 text-text-muted hover:bg-bg-elevated hover:text-text inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] px-3.5 py-1 text-xs font-medium transition-all hover:border-white/20 active:scale-[0.98]"
          >
            MTEL Thailand
          </a>
          <a
            href="#experience"
            className="bg-bg-elevated/70 text-text-muted hover:bg-bg-elevated hover:text-text inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] px-3.5 py-1 text-xs font-medium transition-all hover:border-white/20 active:scale-[0.98]"
          >
            Brilliant & Million
          </a>
          <a
            href="#experience"
            className="bg-bg-elevated/70 text-text-muted hover:bg-bg-elevated hover:text-text inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] px-3.5 py-1 text-xs font-medium transition-all hover:border-white/20 active:scale-[0.98]"
          >
            Ai9 Co., Ltd
          </a>
        </div>
      </div>
    </section>
  );
}
