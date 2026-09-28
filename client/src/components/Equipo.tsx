/**
 * Seção "Nuestro Equipo": pessoas-chave da Adatta, sem fotos (iniciais como marca d'água).
 * Faixa azul-escura entre "Sobre" (branca) e "Trayectoria" (cinza-clara).
 */

type Lang = "es" | "en";

interface Member {
  name: string;
  role: Record<Lang, string>;
  bio: Record<Lang, string>;
}

const members: Member[] = [
  {
    name: "Adriano Alves",
    role: { es: "Director · Project Controls & Technology", en: "Director · Project Controls & Technology" },
    bio: {
      es: "Más de 25 años de experiencia en proyectos de infraestructura en Latinoamérica, combinando tecnología, bases de datos y conocimiento de los procesos de obra. Experiencia en costos, Project Controls, nómina, subcontratos y estructuración de datos y evidencias para soporte de claims.",
      en: "Over 25 years of experience in infrastructure projects across Latin America, combining technology, databases and knowledge of site processes. Experience in costs, Project Controls, payroll, subcontracts and structuring data and evidence to support claims.",
    },
  },
  {
    name: "Stephanie Lay",
    role: { es: "Coordinadora de Operaciones & Soporte", en: "Operations & Support Coordinator" },
    bio: {
      es: "Responsable de la coordinación administrativa y del soporte a clientes, acompañando la operación de los sistemas y servicios de ADATTA y facilitando la atención, comunicación y seguimiento de las necesidades de cada proyecto.",
      en: "Responsible for administrative coordination and client support, overseeing the operation of ADATTA's systems and services and facilitating service, communication and follow-up on each project's needs.",
    },
  },
  {
    name: "Bruno Henrique",
    role: { es: "Cost & Claims Data Analyst", en: "Cost & Claims Data Analyst" },
    bio: {
      es: "Experiencia en soporte a equipos de Costos y Claims, trabajando con procesamiento, validación y análisis de datos de proyectos. Manejo de Excel y SQL, estructuración de información, preparación de reportes y apoyo a analistas para el seguimiento de costos y reclamos.",
      en: "Experience supporting Cost and Claims teams, working with processing, validation and analysis of project data. Skilled in Excel and SQL, information structuring, report preparation and supporting analysts in tracking costs and claims.",
    },
  },
];

const labels = {
  es: {
    eyebrow: "Nuestro Equipo",
    title: "Personas detrás de ADATTA",
    subtitle: "Experiencia que combina construcción, tecnología y datos.",
    intro:
      "Nuestro equipo reúne experiencia en proyectos de infraestructura, tecnología, gestión de datos y soporte operativo, conectando el conocimiento de obra con soluciones prácticas para nuestros clientes.",
  },
  en: {
    eyebrow: "Our Team",
    title: "The People Behind ADATTA",
    subtitle: "Experience that combines construction, technology and data.",
    intro:
      "Our team brings together experience in infrastructure projects, technology, data management and operational support, connecting site knowledge with practical solutions for our clients.",
  },
};

const initials = (name: string) =>
  name
    .split(" ")
    .map((w) => w[0])
    .join("");

export function Equipo({ language }: { language: Lang }) {
  const l = labels[language];

  return (
    <section id="equipo" className="py-16 md:py-24 bg-gradient-to-br from-[#002447] via-primary to-[#001a33] text-white">
      <div className="container">
        <div className="mb-12 max-w-3xl">
          <p className="text-xs md:text-sm font-semibold uppercase tracking-[0.2em] text-sky-300 mb-3">{l.eyebrow}</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-2" style={{ fontFamily: "Playfair Display" }}>
            {l.title}
          </h2>
          <p className="text-xl md:text-2xl font-semibold text-sky-300 mb-4">{l.subtitle}</p>
          <p className="text-white/80">{l.intro}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {members.map((m) => (
            <div
              key={m.name}
              className="relative overflow-hidden rounded-xl border border-white/15 bg-white/5 p-6 md:p-8"
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -right-2 top-2 text-7xl md:text-8xl font-black leading-none text-white/[0.06] select-none"
              >
                {initials(m.name)}
              </span>
              <div className="relative">
                <div className="h-1 w-10 rounded-full bg-sky-400 mb-5" />
                <h3 className="text-xl font-semibold mb-1">{m.name}</h3>
                <p className="text-sm font-semibold text-sky-300 mb-4">{m.role[language]}</p>
                <p className="text-sm leading-relaxed text-white/80">{m.bio[language]}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
