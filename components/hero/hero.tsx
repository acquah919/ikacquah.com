import { hero } from "@/data/home";
import { professor } from "@/data/professor";
import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/localized";
import { HeroStage } from "./hero-stage";

export async function Hero({ locale }: { locale: Locale }) {
  const t = pick(locale);

  return (
    <HeroStage
      eyebrow={t(hero.eyebrow)}
      roles={t(professor.roles)}
      lines={t(hero.lines)}
      lead={t(hero.lead)}
      primaryCta={t(hero.primaryCta)}
      secondaryCta={t(hero.secondaryCta)}
      cv={professor.cv}
      portrait={{ ...professor.portrait, alt: t(professor.portrait.alt) }}
    />
  );
}
