import { SplitLines, type SplitLine } from "@/components/motion/split-lines";
import { Eyebrow } from "./eyebrow";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  index: string;
  eyebrow: string;
  lines: string[];
  accent?: number | "last" | "none";
  as?: "h1" | "h2" | "h3";
  id?: string;
  size?: "xl" | "lg" | "md";
  className?: string;
  eyebrowClassName?: string;
}

const sizes = {
  xl: "text-display-xl",
  lg: "text-display-lg",
  md: "text-display-md",
};

export function SectionHeading({
  index,
  eyebrow,
  lines,
  accent = "last",
  as = "h2",
  id,
  size = "lg",
  className,
  eyebrowClassName,
}: SectionHeadingProps) {
  const accentIndex = accent === "last" ? lines.length - 1 : accent;
  const styledLines: SplitLine[] = lines.map((text, i) => ({
    text,
    className: i === accentIndex ? "italic normal-case text-accent" : undefined,
  }));

  return (
    <div
      className={cn(
        "@container min-w-0 flex flex-col gap-8 md:gap-10",
        className,
      )}
    >
      <Eyebrow index={index} className={eyebrowClassName}>
        {eyebrow}
      </Eyebrow>
      <SplitLines
        as={as}
        id={id}
        lines={styledLines}
        className={cn("uppercase min-w-0 max-w-full pe-[0.22em]", sizes[size])}
      />
    </div>
  );
}
