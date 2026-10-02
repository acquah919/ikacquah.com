import { ImageResponse } from "next/og";
import { displayName, professor } from "@/data/professor";
import { isLocale, type Locale } from "@/i18n/config";
import { localize } from "@/i18n/localized";
import { routing } from "@/i18n/routing";
import { siteUrl } from "@/lib/seo";

export const alt = `${displayName}, medical physicist`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

/** Fraunces for the social card; falls back to the default face offline. */
async function loadDisplayFont() {
  try {
    const css = await fetch(
      "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500&display=swap",
      { headers: { "User-Agent": "curl/8" } },
    ).then((r) => r.text());
    const url = css.match(/src: url\((.+?)\) format\('truetype'\)/)?.[1];
    if (!url) return null;
    return await fetch(url).then((r) => r.arrayBuffer());
  } catch {
    return null;
  }
}

const palette = {
  ivory: "#F2E8DC",
  ink: "#3B2F24",
  graphite: "#AD9E8F",
  teal: "#8FC058",
};

export default async function OpenGraphImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : routing.defaultLocale;
  const font = await loadDisplayFont();
  const roles = localize(professor.roles, locale).join("  ·  ");
  const title = localize(professor.title, locale);
  const university = localize(professor.current.institution, locale);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: `linear-gradient(135deg, ${palette.ivory} 0%, #ffffff 100%)`,
          color: palette.ink,
          fontFamily: font ? "Fraunces" : "serif",
          position: "relative",
        }}
      >
        <svg
          width="720"
          height="720"
          viewBox="0 0 800 800"
          fill="none"
          stroke={palette.teal}
          strokeWidth="1.5"
          style={{ position: "absolute", right: -160, top: -120, opacity: 0.22 }}
        >
          <ellipse cx="420" cy="400" rx="380" ry="300" />
          <ellipse cx="430" cy="395" rx="320" ry="245" />
          <ellipse cx="440" cy="390" rx="262" ry="194" />
          <ellipse cx="448" cy="386" rx="206" ry="148" />
          <ellipse cx="454" cy="383" rx="152" ry="106" />
          <ellipse cx="458" cy="381" rx="100" ry="68" />
        </svg>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            fontSize: 22,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: palette.teal,
            fontFamily: "sans-serif",
            fontWeight: 600,
          }}
        >
          <div style={{ width: 48, height: 2, background: palette.teal }} />
          {title.toUpperCase()}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 108, lineHeight: 0.95, letterSpacing: -3 }}>
            {`${professor.honorific} ${professor.fullName}`}
          </div>
          <div
            style={{
              fontSize: 26,
              color: palette.graphite,
              fontFamily: "sans-serif",
              letterSpacing: 2,
              textTransform: "uppercase",
            }}
          >
            {roles}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 24,
            color: palette.graphite,
            fontFamily: "sans-serif",
          }}
        >
          <span>{university}</span>
          <span>{siteUrl.host}</span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: font
        ? [{ name: "Fraunces", data: font, style: "normal", weight: 400 }]
        : undefined,
    },
  );
}
