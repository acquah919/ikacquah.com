import { cn } from "@/lib/utils";

interface EmailLinkProps {
  email: string;
  className?: string;
}

export function EmailLink({ email, className }: EmailLinkProps) {
  return (
    <a
      href={`mailto:${email}`}
      dir="ltr"
      className={cn("underline decoration-foreground/30 underline-offset-4 transition-colors hover:text-accent", className)}
    >
      {email}
    </a>
  );
}
