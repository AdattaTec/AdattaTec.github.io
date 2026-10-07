import { Construction, Globe, HardHat, type LucideIcon } from "lucide-react";
import { JourneyTimeline } from "./JourneyTimeline";

/**
 * Seção "Trayectoria": números + linha do tempo 1998–2026 (JourneyTimeline, a mesma da página /adriano).
 */

type Lang = "es" | "en";

const stats: { icon: LucideIcon; value: string; label: Record<Lang, string> }[] = [
  { icon: HardHat, value: "+25", label: { es: "años de experiencia", en: "years of experience" } },
  { icon: Construction, value: "+30", label: { es: "proyectos en Latinoamérica", en: "projects in Latin America" } },
  { icon: Globe, value: "8", label: { es: "países", en: "countries" } },
];

const labels = {
  es: { title: "Trayectoria y evolución", subtitle: "Más de 25 años desarrollando soluciones desde la realidad de grandes proyectos de infraestructura." },
  en: { title: "Track record and evolution", subtitle: "More than 25 years developing solutions from the reality of major infrastructure projects." },
};

export function Trayectoria({ language }: { language: Lang }) {
  const l = labels[language];

  return (
    <section id="trayectoria" className="py-16 md:py-24 bg-secondary/30">
      <div className="container">
        <div className="mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-2" style={{ fontFamily: "Playfair Display" }}>
            {l.title}
          </h2>
          <p className="text-muted-foreground max-w-3xl">{l.subtitle}</p>
        </div>

        <div className="grid grid-cols-3 gap-3 md:gap-6 mb-12">
          {stats.map((s) => (
            <div key={s.value} className="bg-white rounded-lg border border-border p-4 md:p-6 text-center">
              <s.icon className="mx-auto mb-2 text-accent w-6 h-6 md:w-8 md:h-8" />
              <p className="text-3xl md:text-5xl font-bold text-primary">{s.value}</p>
              <p className="text-xs md:text-sm text-muted-foreground mt-1">{s.label[language]}</p>
            </div>
          ))}
        </div>

        <JourneyTimeline lang={language} />
      </div>
    </section>
  );
}
