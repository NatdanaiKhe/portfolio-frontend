import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import type { ComponentProps } from "react";

interface CTAButtonProps extends ComponentProps<typeof Button> {
  href: string;
  external?: boolean;
  showArrow?: boolean;
}

export function CTAButton({
  href,
  external,
  showArrow = true,
  children,
  ...props
}: CTAButtonProps) {
  return (
    <Button asChild {...props}>
      <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className="transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98]"
      >
        {children}
        {showArrow && (
          <span className="ml-1 flex h-6 w-6 items-center justify-center rounded-full bg-text/10 transition-transform duration-300 group-hover:translate-x-0.5">
            <ArrowRight className="h-3.5 w-3.5" />
          </span>
        )}
      </a>
    </Button>
  );
}
