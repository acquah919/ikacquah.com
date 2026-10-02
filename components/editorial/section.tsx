import { cn } from "@/lib/utils";

export type SectionTheme = "ivory" | "white" | "dark" | "teal";

const themes: Record<SectionTheme, string> = {
  ivory: "bg-background text-foreground",
  white: "bg-card text-card-foreground",
  dark: "dark bg-background text-foreground",
  teal: "dark bg-teal text-warm-white",
};

interface SectionProps extends React.ComponentProps<"section"> {
  theme?: SectionTheme;
  padded?: boolean;
}

export function Section({
  theme = "ivory",
  padded = true,
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <section
      data-theme={theme === "dark" || theme === "teal" ? "dark" : undefined}
      data-tone={theme}
      className={cn(
        "relative isolate overflow-hidden [content-visibility:auto] [contain-intrinsic-size:auto_720px]",
        themes[theme],
        padded && "py-24 md:py-32 lg:py-40",
        className,
      )}
      {...props}
    >
      {children}
    </section>
  );
}
