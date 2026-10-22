import { BlocksRenderer, type BlocksContent } from "@strapi/blocks-react-renderer";
import type { ReactNode } from "react";
import type { StrapiBlock } from "@/types";
import { CodeBlock } from "@/components/code-block";
import { slugify } from "@/lib/utils";

interface BlocksRendererWrapperProps {
  content: StrapiBlock[];
}

export function BlogContent({ content }: BlocksRendererWrapperProps) {
  return (
    <BlocksRenderer
      content={content as unknown as BlocksContent}
      blocks={
        {
          code: ({ plainText }: { plainText?: string }) => (
            <CodeBlock code={plainText ?? ""} language="typescript" />
          ),
          heading: ({ level, children }: { level: number; children: ReactNode }) => {
            const text =
              typeof children === "string"
                ? children
                : Array.isArray(children)
                  ? children
                      .flatMap((c) =>
                        typeof c === "string"
                          ? c
                          : (c as { props?: { children?: string } })?.props
                              ?.children ?? "",
                      )
                      .join("")
                  : "";
            const id = slugify(text);

            if (level === 3) return <h3 id={id}>{children}</h3>;
            if (level === 4) return <h4 id={id}>{children}</h4>;
            if (level === 5) return <h5 id={id}>{children}</h5>;
            if (level === 6) return <h6 id={id}>{children}</h6>;
            return <h2 id={id}>{children}</h2>;
          },
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } as any
      }
    />
  );
}
