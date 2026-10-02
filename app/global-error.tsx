"use client";

import { Spline_Sans, Fraunces } from "next/font/google";

const spline = Spline_Sans({
  subsets: ["latin"],
  weight: ["400", "500"],
});

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["500"],
});

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body
        className={`${spline.className} min-h-svh bg-[oklch(0.935_0.018_75)] text-[oklch(0.248_0.022_60)] antialiased`}
      >
        <main className="mx-auto flex min-h-svh max-w-3xl flex-col justify-center px-6 py-24">
          <p className="text-xs font-medium tracking-[0.18em] text-[oklch(0.452_0.108_128)] uppercase">
            Something went wrong
          </p>
          <h1 className={`${fraunces.className} mt-6 text-5xl leading-none tracking-tight`}>
            This page could not finish loading.
          </h1>
          <p className="mt-6 max-w-md text-lg text-[oklch(0.5_0.028_70)]">
            A temporary fault stopped the page. Try again, or go back to the homepage.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={reset}
              className="rounded-md bg-[oklch(0.248_0.022_60)] px-5 py-3 text-sm text-[oklch(0.935_0.018_75)]"
            >
              Try again
            </button>
            <a
              href="/"
              className="rounded-md border border-[oklch(0.86_0.018_75)] px-5 py-3 text-sm"
            >
              Back to the homepage
            </a>
          </div>
        </main>
      </body>
    </html>
  );
}
