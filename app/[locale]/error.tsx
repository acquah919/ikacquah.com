"use client";

import { ArrowLeft, RotateCcw } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/editorial/eyebrow";
import { DisplayHeading } from "@/components/editorial/display-heading";
import { Link } from "@/i18n/navigation";

export default function LocaleError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations("Error");

  return (
    <main id="main" className="relative isolate flex min-h-[70svh] flex-col justify-center overflow-hidden py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 start-[-10%] h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(closest-side,oklch(0.698_0.028_70/0.28),transparent_70%)]"
      />
      <div className="container-editorial">
        <Eyebrow className="text-accent">{t("eyebrow")}</Eyebrow>
        <DisplayHeading as="h1" size="lg" className="mt-8 max-w-4xl">
          {t("title")}
        </DisplayHeading>
        <p className="text-lead mt-8 max-w-md text-muted-foreground">{t("body")}</p>
        <div className="mt-12 flex flex-wrap gap-3">
          <Button size="lg" onClick={reset}>
            <RotateCcw className="size-4" />
            {t("retry")}
          </Button>
          <Button size="lg" variant="outline" nativeButton={false} render={<Link href="/" />}>
            <ArrowLeft className="size-4 rtl:-scale-x-100" />
            {t("back")}
          </Button>
        </div>
      </div>
    </main>
  );
}
