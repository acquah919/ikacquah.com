import Image from "next/image";
import { cn } from "@/lib/utils";

interface ArticleFigureProps {
  src: string;
  alt: string;
  width: number | `${number}`;
  height: number | `${number}`;
  caption: string;
  loading?: "eager" | "lazy";
  className?: string;
  frameClassName?: string;
}

export function ArticleFigure({
  src,
  alt,
  width,
  height,
  caption,
  loading = "lazy",
  className,
  frameClassName,
}: ArticleFigureProps) {
  const sizes = "(max-width: 768px) calc(100vw - 40px), 800px";

  return (
    <figure className={cn("my-10", className)}>
      {frameClassName ? (
        <div className={cn("relative overflow-hidden rounded-lg", frameClassName)}>
          <Image
            src={src}
            alt={alt}
            fill
            loading={loading}
            sizes={sizes}
            className="object-cover object-top"
          />
        </div>
      ) : (
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading={loading}
          sizes={sizes}
          className="h-auto w-full rounded-lg"
        />
      )}
      <figcaption className="mt-4 text-center text-sm leading-relaxed text-muted-foreground italic">
        {caption}
      </figcaption>
    </figure>
  );
}
