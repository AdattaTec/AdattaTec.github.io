import { useState } from "react";
import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * Seção "Asesoría": serviços de consultoria de maior valor (know-how de obra),
 * separados dos serviços técnicos. Card com foto + modal com a arte completa.
 */

type Lang = "es" | "en";

interface Offer {
  id: string;
  image: string;
  fullImage?: Record<Lang, string>;
  name: Record<Lang, string>;
  tagline: Record<Lang, string>;
  description: Record<Lang, string>;
  highlights: Record<Lang, string[]>;
  details: Record<Lang, string[]>;
}

const offers: Offer[] = [
  {
    id: "claims",
    image: "/images/asesoria/claims.webp",
    fullImage: { es: "/images/asesoria/claims-full-es.webp", en: "/images/asesoria/claims-full-en.webp" },
    name: { es: "Datos de Proyecto y Preparación para Reclamos", en: "Project Data & Claims Readiness" },
    tagline: { es: "La infraestructura de evidencia de su proyecto.", en: "The evidence infrastructure for your project." },
    description: {
      es: "Capture, integre, organice y preserve los datos de su obra: información confiable para Project Controls, toma de decisiones y soporte a reclamos. Porque un reclamo no comienza cuando surge la disputa; comienza con la calidad de sus registros desde el primer día.",
      en: "Capture, integrate, organize and preserve your project data: reliable information for Project Controls, decision-making and claims support. Because a claim doesn't start when a dispute arises; it starts with the quality of your records from day one.",
    },
    highlights: {
      es: ["Información centralizada", "Trazabilidad completa", "Soporte a reclamos"],
      en: ["Centralized information", "Full traceability", "Claims support"],
    },
    details: {
      es: [
        "Integración de fuentes: mano de obra y nómina, equipos y flotas, accesos, planta de concreto, materiales, costos, cronograma (Primavera P6), planos/BIM, calidad, fotos y drones, subcontratistas",
        "Histórico confiable de eventos, documentos, costos, productividad y recursos",
        "Cronologías y consolidación de evidencias para soporte a reclamos",
        "Visibilidad en tiempo real: una sola plataforma, toda la historia de su proyecto",
      ],
      en: [
        "Source integration: labor and payroll, equipment and fleet, access control, concrete plant, materials, costs, schedule (Primavera P6), plans/BIM, quality, photos and drones, subcontractors",
        "Reliable history of events, documents, costs, productivity and resources",
        "Chronologies and evidence consolidation to support claims",
        "Real-time visibility: one platform, the complete project story",
      ],
    },
  },
  {
    id: "controls",
    image: "/images/asesoria/controls.webp",
    fullImage: { es: "/images/asesoria/controls-full.webp", en: "/images/asesoria/controls-full.webp" },
    name: { es: "Project Controls", en: "Project Controls" },
    tagline: {
      es: "Del dato en la obra a la información, de la información a mejores decisiones.",
      en: "From site data to information, from information to better decisions.",
    },
    description: {
      es: "Asesoría en control de costos, presupuesto y contratos para obras de infraestructura, con la experiencia de grandes proyectos en Latinoamérica y el soporte de Adatta Cost, Budget y Contract.",
      en: "Advisory on cost, budget and contract control for infrastructure projects, backed by experience in major Latin American projects and supported by Adatta Cost, Budget and Contract.",
    },
    highlights: {
      es: ["Control de costos", "Presupuesto y forecast", "Contratos y subcontratos"],
      en: ["Cost control", "Budget and forecast", "Contracts and subcontracts"],
    },
    details: {
      es: [
        "Costos por rubro y actividad, curva S y análisis de variaciones (real vs. presupuestado)",
        "Estudios y escenarios, CBS, estimaciones, forecast y flujo de caja del proyecto",
        "Control de contratos y subcontratos, cambios, reclamos, compromisos y certificaciones",
        "Reportes gerenciales e integración con otros sistemas",
      ],
      en: [
        "Costs by item and activity, S-curve and variance analysis (actual vs. budget)",
        "Studies and scenarios, CBS, estimates, forecast and project cash flow",
        "Contract and subcontract control, changes, claims, commitments and certifications",
        "Management reports and integration with other systems",
      ],
    },
  },
  {
    id: "planilla",
    image: "/images/asesoria/planilla.webp",
    name: { es: "Tercerización de Planilla", en: "Payroll Outsourcing" },
    tagline: {
      es: "Su equipo se enfoca en la obra; nosotros, en que cada pago salga correcto y a tiempo.",
      en: "Your team focuses on the project; we make sure every payment is right and on time.",
    },
    description: {
      es: "Procesamos la planilla de su proyecto de principio a fin con Adatta PayRoll, integrada a la marcación de asistencia de Adatta SisGep: menos carga administrativa, más control y reportes listos para la gestión.",
      en: "We process your project payroll end to end with Adatta PayRoll, integrated with Adatta SisGep attendance tracking: less administrative load, more control and management-ready reports.",
    },
    highlights: {
      es: ["Cálculo de planilla", "Integración con asistencia", "Reportes gerenciales"],
      en: ["Payroll calculation", "Attendance integration", "Management reports"],
    },
    details: {
      es: [
        "Cálculo de planilla con horas regulares, extras y equivalentes desde la marcación",
        "Administración de personal: vacaciones, ausencias, capacitaciones y control de fases",
        "Planilla 03, Fondo de Enfermedad y cálculo de ISR con proyección",
        "Reportes analíticos y gerenciales, con alertas configurables",
      ],
      en: [
        "Payroll calculation with regular, overtime and equivalent hours from attendance records",
        "Personnel administration: vacations, absences, training and phase control",
        "Planilla 03, sickness fund and income tax (ISR) with projection",
        "Analytical and management reports, with configurable alerts",
      ],
    },
  },
];

const labels = {
  es: { title: "Asesoría", subtitle: "Experiencia de obra y tecnología al servicio de su proyecto", more: "Ver más", cta: "Agendar una conversación" },
  en: { title: "Advisory", subtitle: "Construction experience and technology working for your project", more: "Learn more", cta: "Schedule a conversation" },
};

export function Asesoria({ language, onContact }: { language: Lang; onContact: (subject: string) => void }) {
  const [selected, setSelected] = useState<Offer | null>(null);
  const l = labels[language];

  return (
    <section id="asesoria" className="py-16 md:py-24 bg-secondary/30">
      <div className="container">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-2" style={{ fontFamily: "Playfair Display" }}>
            {l.title}
          </h2>
          <p className="text-muted-foreground">{l.subtitle}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {offers.map((o) => (
            <div key={o.id} className="bg-white rounded-lg border border-border overflow-hidden flex flex-col hover:shadow-lg transition-shadow duration-300">
              <button type="button" onClick={() => setSelected(o)} className="block overflow-hidden">
                <img
                  src={o.image}
                  alt={o.name[language]}
                  loading="lazy"
                  className="w-full aspect-[4/3] object-cover hover:scale-105 transition-transform duration-300"
                />
              </button>
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-xl font-semibold text-foreground mb-2">{o.name[language]}</h3>
                <p className="text-sm text-accent mb-4">{o.tagline[language]}</p>
                <ul className="space-y-1 mb-6">
                  {o.highlights[language].map((h) => (
                    <li key={h} className="flex gap-2 text-sm text-muted-foreground">
                      <Check size={16} className="text-accent flex-shrink-0 mt-0.5" />
                      {h}
                    </li>
                  ))}
                </ul>
                <Button
                  onClick={() => setSelected(o)}
                  variant="outline"
                  className="mt-auto w-full border-primary text-primary hover:bg-primary/10"
                >
                  {l.more}
                </Button>
              </div>
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
              <p className="text-lg text-foreground">{selected.description[language]}</p>
              <ul className="space-y-2">
                {selected.details[language].map((d) => (
                  <li key={d} className="flex gap-3 text-foreground">
                    <Check size={18} className="text-accent flex-shrink-0 mt-1" />
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
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
