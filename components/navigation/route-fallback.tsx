import { Link } from "@/i18n/navigation";

export function RouteFallback({ title, href, label }: { title: string; href: string; label: string }) {
  return (
    <section className="container-editorial min-h-[70svh] pt-32 pb-20 md:pt-40" aria-busy="true">
      <Link href={href} transitionTypes={["nav-back"]} className="project-action text-sm">{label}</Link>
      <h1 className="mt-10 font-display text-5xl tracking-tight md:text-7xl">{title}</h1>
    </section>
  );
}
