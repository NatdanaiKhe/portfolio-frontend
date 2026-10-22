import { codeToHtml } from "shiki";

export async function CodeBlock({
  code,
  language,
}: {
  code: string;
  language: string;
}) {
  let html = "";
  try {
    html = await codeToHtml(code, {
      lang: language,
      theme: "github-dark-dimmed",
    });
  } catch {
    // fall back to plain text if highlighting fails
  }

  if (html) {
    return (
      <div
        dangerouslySetInnerHTML={{ __html: html }}
        className="my-6 overflow-x-auto rounded-xl border border-text/[0.08] bg-[#1c1c1c] [&_pre]:p-5 [&_pre]:text-sm [&_code]:font-mono"
      />
    );
  }

  return (
    <pre className="my-6 overflow-x-auto rounded-xl border border-text/[0.08] bg-[#1c1c1c] p-5 text-sm font-mono text-text-muted">
      <code>{code}</code>
    </pre>
  );
}
