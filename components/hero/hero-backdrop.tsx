import { FieldGlyphs } from "./field-glyphs";
import { IsodoseField } from "./isodose-field";

export function HeroBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
      <div className="absolute inset-0 bg-linear-to-b from-background via-background to-card" />
      <FieldGlyphs />
      <div className="absolute -top-1/4 inset-e-[-10%] h-[70vmax] w-[70vmax] rounded-full bg-[radial-gradient(closest-side,oklch(0.748_0.132_128/0.18),transparent_70%)]" />
      <div className="absolute bottom-[-30%] inset-s-[-15%] h-[60vmax] w-[60vmax] rounded-full bg-[radial-gradient(closest-side,oklch(0.698_0.028_70/0.2),transparent_70%)]" />
      <IsodoseField className="absolute top-[8%] inset-e-[-6%] hidden w-[58vw] max-w-4xl text-leaf-deep opacity-[0.14] lg:block dark:text-leaf dark:opacity-[0.16]" />
    </div>
  );
}
