import { cn } from "@/lib/utils";

interface EyebrowProps extends React.ComponentProps<"span"> {
  index?: string;
}

export function Eyebrow({ index, className, children, ...props }: EyebrowProps) {
  return (
    <span
      className={cn(
        "text-eyebrow inline-flex items-center gap-4 text-muted-foreground",
        className,
      )}
      {...props}
    >
      {index && (
        <>
          <span className="tabular-nums">{index}</span>
          <span aria-hidden className="h-px w-10 bg-current opacity-40" />
        </>
      )}
      <span>{children}</span>
    </span>
  );
}
