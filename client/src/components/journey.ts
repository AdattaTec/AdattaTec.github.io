
/**
 * Linha do tempo única, usada na Trayectoria do site e na Experiencia da página /adriano (JourneyTimeline).
 * Textos do mockup "Trajetoria Arte - Adriano.png". Fotos etapa-1..5 = "OneDrive/Adatta/Adatta Tecnologia/imgs-trajetoria" (7:5, 700×500).
 * Ícones icono-1..5 = PNG recortados do mockup.
 */

type Lang = "es" | "en";

export interface JourneyStage {
  years: string;
  image: string;
  icon: string; // PNG recortado do mockup (fundo transparente)
  place: Record<Lang, string>;
  subtitle: Record<Lang, string>;
  projects: Record<Lang, string>;
  bullets: Record<Lang, string[]>;
  quote: Record<Lang, string>;
}

export const journey: JourneyStage[] = [
  {
    years: "1998 – 2000",
    image: "/images/trayectoria/etapa-1.webp?v=4",
    icon: "/images/trayectoria/icono-1.png",
    place: { es: "Brasil", en: "Brazil" },
    subtitle: { es: "Costos y Control", en: "Costs and Control" },
    projects: { es: "UHE Manso y otros proyectos", en: "UHE Manso and other projects" },
    bullets: {
      es: [
        "Primeras experiencias en control de costos, apropiación de recursos e integración de información de obra.",
        "Desarrollo de soluciones a partir de necesidades reales del proyecto.",
      ],
      en: [
        "First experiences in cost control, resource allocation and integration of site information.",
        "Development of solutions based on the project's real needs.",
      ],
    },
    quote: { es: "Obra y experiencia", en: "Site work and experience" },
  },
  {
    years: "2001 – 2008",
    image: "/images/trayectoria/etapa-2.webp?v=4",
    icon: "/images/trayectoria/icono-2.png",
    place: { es: "Venezuela", en: "Venezuela" },
    subtitle: { es: "Project Controls y Construcción", en: "Project Controls and Construction" },
    projects: {
      es: "II Puente Orinoco, Tocoma, Metro Caracas / Los Teques y otros proyectos",
      en: "II Orinoco Bridge, Tocoma, Caracas / Los Teques Metro and other projects",
    },
    bullets: {
      es: [
        "Evolución hacia soluciones de Budget, Cost, Contract, Control y Control de Acceso.",
        "Integración de procesos de costos, presupuestos, producción y gestión contractual.",
      ],
      en: [
        "Evolution toward Budget, Cost, Contract, Control and Access Control solutions.",
        "Integration of cost, budgeting, production and contract management processes.",
      ],
    },
    quote: { es: "Más proyectos, más conocimiento", en: "More projects, more knowledge" },
  },
  {
    years: "2010 – 2012",
    image: "/images/trayectoria/etapa-3.webp?v=4",
    icon: "/images/trayectoria/icono-3.png",
    place: { es: "Panamá", en: "Panama" },
    subtitle: { es: "Tracking, Automatización e Integración", en: "Tracking, Automation and Integration" },
    projects: { es: "Ampliación del Canal de Panamá – GUPC", en: "Panama Canal Expansion – GUPC" },
    bullets: {
      es: [
        "Implementación de Tracking & Control, con captura automática e integración de datos de plantas de concreto, trituración, silos, balanzas y otros procesos productivos.",
        "Soporte para Claims a partir de datos reales de obra.",
      ],
      en: [
        "Implementation of Tracking & Control, with automatic capture and integration of data from concrete plants, crushing, silos, scales and other production processes.",
        "Claims support based on real site data.",
      ],
    },
    quote: { es: "Datos en tiempo real para grandes obras", en: "Real-time data for major projects" },
  },
  {
    years: "2013 – 2020",
    image: "/images/trayectoria/etapa-4.webp?v=4",
    icon: "/images/trayectoria/icono-4.png",
    place: { es: "Expansión regional", en: "Regional expansion" },
    subtitle: { es: "Sistemas integrados y soluciones especializadas", en: "Integrated systems and specialized solutions" },
    projects: {
      es: "Panamá · Colombia · Argentina · Brasil · Centroamérica · Perú",
      en: "Panama · Colombia · Argentina · Brazil · Central America · Peru",
    },
    bullets: {
      es: [
        "Desarrollo e implementación de soluciones (SisGep, Payroll, Daily Reports, Tools, INSP, etc.).",
        "Consultoría, integración de sistemas y estandarización de procesos en proyectos de gran escala.",
      ],
      en: [
        "Development and implementation of solutions (SisGep, Payroll, Daily Reports, Tools, INSP, etc.).",
        "Consulting, systems integration and process standardization on large-scale projects.",
      ],
    },
    quote: { es: "Soluciones que se adaptan a cada proyecto", en: "Solutions that adapt to every project" },
  },
  {
    years: "2021 – 2026",
    image: "/images/trayectoria/etapa-5.webp?v=4",
    icon: "/images/trayectoria/icono-5.png",
    place: { es: "Integración y evolución digital", en: "Digital integration and evolution" },
    subtitle: { es: "Nueva generación de soluciones", en: "A new generation of solutions" },
    projects: {
      es: "Metro de Panamá · Cuarto Puente · Carretera Panamericana Este y nuevos proyectos",
      en: "Panama Metro · Fourth Bridge · East Pan-American Highway and new projects",
    },
    bullets: {
      es: [
        "Consolidación de soluciones para Project Controls, campo, nómina, equipos, producción, calidad y datos.",
        "Integración con BI, BIM, sensores e IoT, rumbo a Construction 4.0.",
      ],
      en: [
        "Consolidation of solutions for Project Controls, field, payroll, equipment, production, quality and data.",
        "Integration with BI, BIM, sensors and IoT, toward Construction 4.0.",
      ],
    },
    quote: { es: "Construyendo el futuro con datos", en: "Building the future with data" },
  },
];
