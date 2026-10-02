import { cn } from "@/lib/utils";

type Size = "xl" | "lg" | "md" | "sm";

const sizes: Record<Size, string> = {
  xl: "text-display-xl",
  lg: "text-display-lg",
  md: "text-display-md",
  sm: "text-display-sm",
};

interface DisplayHeadingProps extends React.ComponentProps<"h2"> {
  as?: "h1" | "h2" | "h3" | "p";
  size?: Size;
}

export function DisplayHeading({
  as: Tag = "h2",
  size = "lg",
  className,
  ...props
}: DisplayHeadingProps) {
  return <Tag className={cn("font-display font-bold", sizes[size], className)} {...props} />;
}
