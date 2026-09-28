import { useState } from "react";
import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * Seção "Asesoría": serviços de consultoria de maior valor (know-how de obra),
 * separados dos serviços técnicos. Mesmo padrão dos Productos: card com foto,
 * subtítulo e frase; modal com a arte completa, detalhe e lista de alcance.
 */

type Lang = "es" | "en";

interface Offer {
  id: string;
  image: string;
  fullImage?: Record<Lang, string>;
  name: Record<Lang, string>;
  subtitle: Record<Lang, string>;
  card: Record<Lang, string>;
  detail: Record<Lang, string>;
  concept?: Record<Lang, string>;
  scope: Record<Lang, string[]>;
  benefits?: Record<Lang, string[]>;
}

// O "&" da Playfair Display é um floreio caligráfico que parece erro; usa o da fonte do texto
const withPlainAmpersand = (text: string) =>
  text.split("&").flatMap((part, i) => (i === 0 ? [part] : [<span key={i} className="font-sans">&amp;</span>, part]));

const offers: Offer[] = [
  {
    id: "claims",
    image: "/images/asesoria/claims.webp?v=2",
    fullImage: { es: "/images/asesoria/claims-full.webp?v=2", en: "/images/asesoria/claims-full.webp?v=2" },
    name: { es: "Datos de Proyecto y Preparación para Reclamos", en: "Project Data & Claims Readiness" },
    subtitle: {
      es: "Centralización, Trazabilidad y Claims Readiness",
      en: "Centralization, Traceability and Claims Readiness",
    },
    card: {
      es: "Centralizamos los datos del proyecto para transformar información dispersa en trazabilidad, gestión y evidencia.",
      en: "We centralize project data to turn scattered information into traceability, management and evidence.",
    },
    detail: {
      es: "Identificamos las diferentes fuentes de información de la obra y estructuramos una base de datos centralizada y continuamente actualizada, consolidando registros de producción, recursos, avances, eventos y demás información relevante del proyecto para generar reportes, dashboards y evidencia confiable para la gestión y futuros reclamos.",
      en: "We identify the site's different information sources and build a centralized, continuously updated database, consolidating production, resources, progress, events and other relevant project records to deliver reports, dashboards and reliable evidence for management and future claims.",
    },
    concept: {
      es: "De múltiples fuentes a una única historia del proyecto.",
      en: "From multiple sources to a single project story.",
    },
    scope: {
      es: [
        "Diagnóstico de Fuentes de Datos",
        "Centralización y Consolidación de Información",
        "Base de Datos Única del Proyecto",
        "Estructuración y Normalización de Datos",
        "Actualización Continua",
        "Plantas de Concreto",
        "Plantas de Trituración",
        "Plantas de Asfalto",
        "Balanzas y Producción",
        "Mano de Obra y Equipos",
        "Avances y Cantidades Ejecutadas",
        "Registros Diarios",
        "Fotografías y Evidencias",
        "Cronología del Proyecto",
        "Cambios y Eventos Relevantes",
        "Correspondencias y Documentos",
        "Integración de Fuentes de Datos",
        "Reportes Automatizados",
        "Dashboards e Indicadores",
        "Trazabilidad Histórica",
        "Soporte de Datos para Claims",
        "Claims Readiness",
      ],
      en: [
        "Data Source Assessment",
        "Information Centralization and Consolidation",
        "Single Project Database",
        "Data Structuring and Normalization",
        "Continuous Updating",
        "Concrete Plants",
        "Crushing Plants",
        "Asphalt Plants",
        "Scales and Production",
        "Labor and Equipment",
        "Progress and Executed Quantities",
        "Daily Records",
        "Photos and Evidence",
        "Project Chronology",
        "Changes and Relevant Events",
        "Correspondence and Documents",
        "Data Source Integration",
        "Automated Reports",
        "Dashboards and Indicators",
        "Historical Traceability",
        "Data Support for Claims",
        "Claims Readiness",
      ],
    },
  },
  {
    id: "controls",
    image: "/images/asesoria/controls.webp?v=2",
    fullImage: { es: "/images/asesoria/controls-full.webp?v=2", en: "/images/asesoria/controls-full.webp?v=2" },
    name: { es: "Project Controls", en: "Project Controls" },
    subtitle: {
      es: "Costos, Avance y Desempeño del Proyecto",
      en: "Project Costs, Progress and Performance",
    },
    card: {
      es: "Control de costos, avance y desempeño para una gestión basada en información confiable.",
      en: "Cost, progress and performance control for management based on reliable information.",
    },
    detail: {
      es: "Apoyamos el seguimiento y control del proyecto mediante el análisis integrado de presupuesto, costos reales, producción, avance y recursos, permitiendo identificar desviaciones y generar información confiable para la toma de decisiones.",
      en: "We support project monitoring and control through integrated analysis of budget, actual costs, production, progress and resources, making it possible to identify variances and generate reliable information for decision-making.",
    },
    scope: {
      es: [
        "Presupuesto y Línea Base",
        "Costos Reales",
        "Real vs. Presupuesto",
        "Avance Físico",
        "Producción",
        "Costos Unitarios",
        "Mano de Obra",
        "Equipos",
        "Materiales",
        "Subcontratos",
        "Centros de Costos",
        "Indicadores de Desempeño",
        "Curvas de Avance",
        "Análisis de Desviaciones",
        "Dashboards Gerenciales",
        "Consistencia de Información",
        "Reportes para la Gestión del Proyecto",
      ],
      en: [
        "Budget and Baseline",
        "Actual Costs",
        "Actual vs. Budget",
        "Physical Progress",
        "Production",
        "Unit Costs",
        "Labor",
        "Equipment",
        "Materials",
        "Subcontracts",
        "Cost Centers",
        "Performance Indicators",
        "Progress Curves",
        "Variance Analysis",
        "Management Dashboards",
        "Information Consistency",
        "Project Management Reports",
      ],
    },
  },
  {
    id: "planilla",
    image: "/images/asesoria/planilla.webp?v=2",
    fullImage: { es: "/images/asesoria/planilla-full.webp?v=2", en: "/images/asesoria/planilla-full.webp?v=2" },
    name: { es: "Outsourcing de Nómina", en: "Payroll Outsourcing" },
    subtitle: { es: "Operación Integral de Nómina", en: "End-to-End Payroll Operation" },
    card: {
      es: "Gestión integral de nómina, cumplimiento y soporte especializado, respaldados por tecnología y experiencia local.",
      en: "End-to-end payroll management, compliance and specialized support, backed by technology and local expertise.",
    },
    detail: {
      es: "Administramos la nómina de forma total o parcial, desde la recepción y validación de novedades hasta el cálculo, revisión, cumplimiento de obligaciones, generación de archivos de pago, comprobantes y reportes, reduciendo la carga operativa de Recursos Humanos.",
      en: "We manage payroll fully or partially, from receiving and validating payroll changes to calculation, review, compliance with obligations and generation of payment files, pay slips and reports, reducing the operational workload of Human Resources.",
    },
    scope: {
      es: [
        "Administración Integral de Nómina",
        "Recepción y Validación de Novedades",
        "Preplanilla",
        "Cálculo y Emisión de Nómina",
        "Horas Regulares y Extras",
        "Recargos y Condiciones Especiales",
        "Vacaciones y Ausencias",
        "Incapacidades",
        "Bonificaciones y Deducciones",
        "ISR y Proyección de ISR",
        "XIII Mes",
        "Vacaciones",
        "Liquidaciones y Prestaciones",
        "SIPE",
        "Anexo 03",
        "Cargas Sociales",
        "Generación de Comprobantes de Pago",
        "Archivos Bancarios",
        "Reportes de Nómina",
        "Reportes Analíticos y Gerenciales",
        "Historial de Nómina",
        "Trazabilidad y Auditoría",
        "Parametrización de Conceptos e Incidencias",
        "Control y Validación de Procesos",
        "Soporte Especializado",
        "Seguridad y Confidencialidad de la Información",
        "Servicio Total o Parcial Adaptado al Cliente",
      ],
      en: [
        "End-to-End Payroll Administration",
        "Receipt and Validation of Payroll Changes",
        "Pre-Payroll",
        "Payroll Calculation and Issuance",
        "Regular and Overtime Hours",
        "Surcharges and Special Conditions",
        "Vacations and Absences",
        "Sick Leave",
        "Bonuses and Deductions",
        "Income Tax (ISR) and ISR Projection",
        "13th Month Pay (XIII Mes)",
        "Vacations",
        "Settlements and Benefits",
        "SIPE",
        "Anexo 03",
        "Social Security Charges",
        "Pay Slip Generation",
        "Bank Files",
        "Payroll Reports",
        "Analytical and Management Reports",
        "Payroll History",
        "Traceability and Audit",
        "Pay Concept and Incident Configuration",
        "Process Control and Validation",
        "Specialized Support",
        "Information Security and Confidentiality",
        "Full or Partial Service Tailored to the Client",
      ],
    },
    benefits: {
      es: [
        "Menor carga operativa para Recursos Humanos",
        "Atención directa y especializada",
        "Historial confiable y auditable",
        "Mayor control y transparencia",
        "Procesos orientados a reducir errores",
        "Cumplimiento de obligaciones de nómina",
        "Flexibilidad según las necesidades del cliente",
        "Protección de la información laboral",
      ],
      en: [
        "Less operational workload for Human Resources",
        "Direct, specialized attention",
        "Reliable, auditable history",
        "Greater control and transparency",
        "Processes designed to reduce errors",
        "Compliance with payroll obligations",
        "Flexibility to fit client needs",
        "Protection of employee information",
      ],
    },
  },
];

const labels = {
  es: {
    title: "Asesoría & Servicios Especializados",
    subtitle: "Experiencia en construcción, datos y tecnología aplicada a la gestión del proyecto.",
    intro:
      "Acompañamos a nuestros clientes en áreas críticas de datos, control de proyectos, reclamos y nómina, combinando conocimiento especializado, experiencia en obra y tecnología.",
    more: "Saber Más",
    scope: "Alcance",
    benefits: "Beneficios",
    cta: "Agendar una conversación",
  },
  en: {
    title: "Advisory & Specialized Services",
    subtitle: "Construction, data and technology expertise applied to project management.",
    intro:
      "We support our clients in critical areas of data, project controls, claims and payroll, combining specialized knowledge, site experience and technology.",
    more: "Learn More",
    scope: "Scope",
    benefits: "Benefits",
    cta: "Schedule a conversation",
  },
};

export function Asesoria({ language, onContact }: { language: Lang; onContact: (subject: string) => void }) {
  const [selected, setSelected] = useState<Offer | null>(null);
  const l = labels[language];

  return (
    <section id="asesoria" className="py-16 md:py-24 bg-secondary/30">
      <div className="container">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-2" style={{ fontFamily: "Playfair Display" }}>
            {withPlainAmpersand(l.title)}
          </h2>
          <p className="text-xl md:text-2xl font-semibold text-foreground mb-4">{l.subtitle}</p>
          <p className="max-w-3xl text-muted-foreground">{l.intro}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {offers.map((o) => (
            <div key={o.id} className="flex flex-col bg-card rounded-lg p-6 md:p-8 border border-border hover:shadow-lg transition-shadow duration-300">
              <button type="button" onClick={() => setSelected(o)} className="block w-full mb-4 shrink-0 overflow-hidden rounded-lg">
                <img
                  src={o.image}
                  alt={o.name[language]}
                  loading="lazy"
                  className="w-full aspect-[4/3] object-cover hover:scale-105 transition-transform duration-300"
                />
              </button>
              <h3 className="self-start text-xl font-semibold text-foreground bg-secondary/60 px-2 py-0.5 rounded mb-1">{o.name[language]}</h3>
              <p className="text-sm text-accent mb-4">{o.subtitle[language]}</p>
              <p className="flex-1 text-muted-foreground mb-6">{o.card[language]}</p>
              <Button
                onClick={() => setSelected(o)}
                variant="outline"
                className="w-full border-primary text-primary hover:bg-primary/10"
              >
                {l.more}
              </Button>
            </div>
          ))}
        </div>
      </div>

      {selected && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-primary text-white p-6 flex items-center justify-between gap-4">
              <h3 className="text-2xl font-bold" style={{ fontFamily: "Playfair Display" }}>
                {selected.name[language]}
              </h3>
              <button onClick={() => setSelected(null)} className="p-1 hover:bg-white/20 rounded transition-colors" aria-label="Cerrar">
                <X size={24} />
              </button>
            </div>
            <div className="p-6 space-y-6">
              {selected.fullImage && (
                <a href={selected.fullImage[language]} target="_blank" rel="noopener noreferrer">
                  <img src={selected.fullImage[language]} alt={selected.name[language]} className="w-full rounded-lg border border-border" />
                </a>
              )}
              <p className="text-lg text-foreground">{selected.detail[language]}</p>
              {selected.concept && (
                <p className="border-l-4 border-accent pl-4 italic text-foreground">{selected.concept[language]}</p>
              )}
              <div>
                <h4 className="text-lg font-semibold text-primary mb-4">{l.scope}</h4>
                <ul className="space-y-2">
                  {selected.scope[language].map((d) => (
                    <li key={d} className="flex gap-3 text-foreground">
                      <span className="text-accent font-bold min-w-fit">•</span>
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
              {selected.benefits && (
                <div>
                  <h4 className="text-lg font-semibold text-primary mb-4">{l.benefits}</h4>
                  <ul className="space-y-2">
                    {selected.benefits[language].map((b) => (
                      <li key={b} className="flex gap-3 text-foreground">
                        <Check size={18} className="text-accent flex-shrink-0 mt-1" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <Button onClick={() => onContact(selected.name[language])} className="w-full bg-primary hover:bg-primary/90 text-white">
                {l.cta}
              </Button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
