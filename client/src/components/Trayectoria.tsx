import { BarChart3, Cloud, FileText, Globe, HardHat, Settings, Truck, Construction, type LucideIcon } from "lucide-react";

/**
 * Seção "Trayectoria": números + linha do tempo 1998–2026 (conteúdo do portfólio institucional).
 */

type Lang = "es" | "en";

const stats: { icon: LucideIcon; value: string; label: Record<Lang, string> }[] = [
  { icon: HardHat, value: "+25", label: { es: "años de experiencia", en: "years of experience" } },
  { icon: Construction, value: "+30", label: { es: "proyectos en Latinoamérica", en: "projects in Latin America" } },
  { icon: Globe, value: "8", label: { es: "países", en: "countries" } },
];

interface Stage {
  years: string;
  image: string;
  icon: LucideIcon;
  place: Record<Lang, string>;
  title: Record<Lang, string>;
  projects: Record<Lang, string>;
  text: Record<Lang, string>;
  quote: Record<Lang, string>;
}

const stages: Stage[] = [
  {
    years: "1998 – 2000",
    image: "/images/trayectoria/1.webp",
    icon: BarChart3,
    place: { es: "Brasil", en: "Brazil" },
    title: { es: "El inicio: Costos y Control", en: "The beginning: Costs and Control" },
    projects: { es: "UHE Manso", en: "UHE Manso" },
    text: {
      es: "Primeras experiencias en control de costos, apropiación de recursos e integración de información de obra. Desarrollo de soluciones a partir de necesidades reales de gestión del proyecto.",
      en: "First experiences in cost control, resource allocation and integration of project information. Development of solutions based on real project management needs.",
    },
    quote: { es: "De la obra a la solución", en: "From the jobsite to the solution" },
  },
  {
    years: "2001 – 2008",
    image: "/images/trayectoria/2.webp",
    icon: FileText,
    place: { es: "Venezuela", en: "Venezuela" },
    title: { es: "Expansión hacia Project Controls", en: "Expansion into Project Controls" },
    projects: {
      es: "II y III Puente sobre el Río Orinoco · Tocoma · Metro Los Teques · El Diluvio · Puente Nigale",
      en: "II and III Bridge over the Orinoco River · Tocoma · Metro Los Teques · El Diluvio · Puente Nigale",
    },
    text: {
      es: "Evolución hacia soluciones de Budget, Cost, Contract, Control y Control de Acceso, integrando procesos de costos, presupuestos, producción y gestión contractual.",
      en: "Evolution toward Budget, Cost, Contract, Control and Access Control solutions, integrating cost, budgeting, production and contract management processes.",
    },
    quote: { es: "Más proyectos, más conocimiento", en: "More projects, more knowledge" },
  },
  {
    years: "2010 – 2012",
    image: "/images/trayectoria/3.webp",
    icon: Truck,
    place: { es: "Panamá", en: "Panama" },
    title: { es: "Tracking, automatización e integración de producción", en: "Tracking, automation and production integration" },
    projects: {
      es: "Ampliación del Canal de Panamá · Tercer Juego de Esclusas · GUPC",
      en: "Panama Canal Expansion · Third Set of Locks · GUPC",
    },
    text: {
      es: "Implementación de Tracking & Control, con captura automática e integración de datos de plantas de concreto, trituración, silos, balanzas y otros procesos productivos, aportando monitoreo, trazabilidad operacional y soporte para Claims.",
      en: "Implementation of Tracking & Control, with automatic capture and integration of data from concrete plants, crushing plants, silos, scales and other production processes, providing monitoring, operational traceability and support for Claims.",
    },
    quote: { es: "Datos en tiempo real para grandes obras", en: "Real-time data for major projects" },
  },
  {
    years: "2013 – 2020",
    image: "/images/trayectoria/4.webp",
    icon: Settings,
    place: { es: "Expansión regional", en: "Regional expansion" },
    title: { es: "De sistemas integrados a soluciones especializadas", en: "From integrated systems to specialized solutions" },
    projects: {
      es: "Panamá · Colombia · Argentina · Brasil · Centroamérica · Perú",
      en: "Panama · Colombia · Argentina · Brazil · Central America · Peru",
    },
    text: {
      es: "Evolución de Control hacia SisGep y ACM, ampliando el ecosistema con PayRoll, Daily Reports, Tools, INSP y otras soluciones para personal, equipos, producción, calidad y operaciones.",
      en: "Evolution of Control into SisGep and ACM, expanding the ecosystem with PayRoll, Daily Reports, Tools, INSP and other solutions for personnel, equipment, production, quality and operations.",
    },
    quote: { es: "Soluciones que se adaptan a cada proyecto", en: "Solutions that adapt to every project" },
  },
  {
    years: "2021 – 2026",
    image: "/images/trayectoria/5.webp",
    icon: Cloud,
    place: { es: "Integración y evolución digital", en: "Digital integration and evolution" },
    title: { es: "Preparando la próxima generación de soluciones", en: "Preparing the next generation of solutions" },
    projects: {
      es: "Metro de Panamá · Cuarto Puente · Carretera Panamericana Este y nuevos proyectos",
      en: "Panama Metro · Fourth Bridge · East Pan-American Highway and new projects",
    },
    text: {
      es: "Consolidación de soluciones para Project Controls, campo, nómina, equipos, producción, calidad y datos, junto con nuevas posibilidades de integración con BI, BIM, sensores, IoT y Construction 4.0.",
      en: "Consolidation of solutions for Project Controls, field, payroll, equipment, production, quality and data, together with new integration possibilities with BI, BIM, sensors, IoT and Construction 4.0.",
    },
    quote: { es: "Construyendo el futuro con datos", en: "Building the future with data" },
  },
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

        <ol className="relative border-l-2 border-accent/40 ml-2 md:ml-4 space-y-8">
          {stages.map((st) => (
            <li key={st.years} className="relative pl-6 md:pl-10">
              <span className="absolute -left-[9px] top-6 w-4 h-4 rounded-full bg-accent ring-4 ring-white" />
              <div className="bg-white rounded-lg border border-border overflow-hidden md:flex">
                <img src={st.image} alt={st.place[language]} loading="lazy" className="w-full h-40 md:w-56 md:h-auto object-cover flex-shrink-0" />
                <div className="p-5 md:p-6">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-2">
                    <span className="text-xl font-bold text-primary">{st.years}</span>
                    <span className="text-xs font-semibold uppercase tracking-wide text-accent">{st.place[language]}</span>
                  </div>
                  <h3 className="flex items-center gap-2 text-lg font-semibold text-foreground mb-1">
                    <st.icon size={20} className="text-primary flex-shrink-0" />
                    {st.title[language]}
                  </h3>
                  <p className="text-sm font-medium text-foreground/80 mb-2">{st.projects[language]}</p>
                  <p className="text-sm text-muted-foreground mb-3">{st.text[language]}</p>
                  <p className="text-sm italic text-accent">“{st.quote[language]}”</p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
