import { useEffect, useState, type ReactNode } from "react";
import {
  ArrowRight, BarChart3, BriefcaseBusiness, Download, FileText, FolderOpen, Globe, Linkedin, Mail, MapPin,
  MessageCircle, Plane, Settings, Target, UserCheck, Users, type LucideIcon,
} from "lucide-react";
import { journey } from "./journey";

/**
 * Página pessoal /adriano (não listada no site, noindex): perfil profissional do Adriano Alves.
 * Layout do mockup "Perfil Profissional de Adriano Alves em Infraestrutura.png".
 * A linha do tempo vem da Trayectoria da empresa (mesmos dados e fotos).
 *
 * Documentos: PDFs em client/public/adriano/docs/ com nome fixo = ID (ver client/src/adriano/DOCUMENTOS.md, que mapeia
 * cada ID ao arquivo de origem do usuário). Para atualizar: copiar o novo PDF por cima do nome fixo e
 * subir DOCS_VERSION (cache do navegador). `null` = ainda não disponível (botão aparece desativado).
 */

type Lang = "es" | "en";

const DOCS_VERSION = 1;
const EMAIL = "alvesadr@gmail.com";
const PHONE = "+507 6811 8637";
const WHATSAPP = "50768118637";
const LINKEDIN = "https://www.linkedin.com/in/adriano-alves-10446763/";

// ID → arquivo publicado
const cvFiles: Record<"ES" | "EN" | "PT" | "IT", string | null> = {
  ES: "/adriano/docs/cv-es.pdf", // CV-ES
  EN: "/adriano/docs/cv-en.pdf", // CV-EN
  PT: "/adriano/docs/cv-pt.pdf", // CV-PT (bandeira do Brasil)
  IT: "/adriano/docs/cv-it.pdf", // CV-IT
};
const portfolioFiles: Partial<Record<keyof typeof cvFiles, string | null>> = {
  ES: "/adriano/docs/portfolio-es.pdf", // PORT ESP
  EN: "/adriano/docs/portfolio-en.pdf", // PORT ENG
};
// Cartas de referência, uma por botão, sem nomes na página
const referenceFiles: (string | null)[] = [
  "/adriano/docs/ref1.pdf", // REF1
  "/adriano/docs/ref2.pdf", // REF2
];

const docUrl = (f: string) => `${f}?v=${DOCS_VERSION}`;

// Bandeiras em SVG (emoji de bandeira não aparece no Windows — vira "ES", "EN"…)
const flags: Record<keyof typeof cvFiles, ReactNode> = {
  ES: (
    <svg viewBox="0 0 30 20" className="h-4 w-6 rounded-sm">
      <rect width="30" height="20" fill="#AA151B" />
      <rect y="5" width="30" height="10" fill="#F1BF00" />
    </svg>
  ),
  EN: (
    <svg viewBox="0 0 60 30" className="h-4 w-6 rounded-sm">
      <clipPath id="uk-clip">
        <path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z" />
      </clipPath>
      <rect width="60" height="30" fill="#012169" />
      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
      <path d="M0,0 L60,30 M60,0 L0,30" clipPath="url(#uk-clip)" stroke="#C8102E" strokeWidth="4" />
      <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10" />
      <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6" />
    </svg>
  ),
  PT: (
    <svg viewBox="0 0 30 20" className="h-4 w-6 rounded-sm">
      <rect width="30" height="20" fill="#009C3B" />
      <path d="M15,2.5 L27.5,10 L15,17.5 L2.5,10 Z" fill="#FFDF00" />
      <circle cx="15" cy="10" r="4.2" fill="#002776" />
    </svg>
  ),
  IT: (
    <svg viewBox="0 0 30 20" className="h-4 w-6 rounded-sm">
      <rect width="10" height="20" fill="#009246" />
      <rect x="10" width="10" height="20" fill="#fff" />
      <rect x="20" width="10" height="20" fill="#CE2B37" />
    </svg>
  ),
};

function CvButton({ code, href }: { code: keyof typeof cvFiles; href: string | null }) {
  const content = (
    <>
      {flags[code]}
      <span>{code}</span>
    </>
  );
  if (!href) {
    return (
      <span className="inline-flex items-center justify-center gap-2 rounded-md border border-border bg-white px-3 py-2 text-sm font-semibold text-muted-foreground opacity-60 grayscale">
        {content}
      </span>
    );
  }
  return (
    <a
      href={docUrl(href)}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center gap-2 rounded-md border border-primary bg-white px-3 py-2 text-sm font-semibold text-primary hover:bg-primary/10"
    >
      {content}
    </a>
  );
}

const t = {
  es: {
    role: "Perfil Profesional",
    nav: { profile: "Perfil", experience: "Experiencia", documents: "Documentos", contact: "Contacto" },
    connect: "Conversemos",
    // Textos do topo (iguais aos das artes ES/EN que o usuário gerou)
    specialties: ["Project Controls", "Análisis de Costos", "Reclamos", "Subcontratos", "Datos & BI"],
    tagline:
      "Más de 25 años apoyando proyectos de infraestructura en América Latina, combinando experiencia en construcción, datos y tecnología.",
    badges: ["Posiciones Estables", "Asignaciones en el Exterior", "Consultoría de Largo Plazo", "Proyectos Especializados"],
    script: ["De la obra", "a los datos", "para mejores", "decisiones"],
    stats: [
      { value: "25+", label: "años de experiencia" },
      { value: "8", label: "países en Latinoamérica" },
      { title: "Proyectos de infraestructura", detail: "Carreteras | Metro | Puertos | Aeropuertos | Hidroeléctricas | Canales" },
      { title: "Project Controls & Datos", detail: "Costos | Contratos | Claims | Subcontratos | BI" },
    ],
    profileTitle: "Perfil Profesional",
    profile: [
      "Profesional senior con más de 25 años de experiencia apoyando proyectos de infraestructura en Latinoamérica mediante sistemas de Project Controls, análisis de costos y productividad, administración de subcontratos, documentación de claims y control de nóminas de construcción.",
      "Amplia experiencia en grandes entornos de ingeniería, integrando datos contractuales, financieros, técnicos y operacionales para mejorar la trazabilidad, los reportes y la toma de decisiones.",
    ],
    readMore: "Ver mi trayectoria",
    docs: {
      cv: { title: "Curriculum Vitae", text: "Experiencia profesional, competencias, proyectos y tecnologías.", note: "PDF · ES · EN · PT · IT" },
      portfolio: { title: "Portafolio Profesional", text: "Trayectoria, principales proyectos, soluciones y resultados (ADATTA + Profesional).", note: "PDF · ES · EN" },
      reference: {
        title: "Referencias Personales",
        text: "Cartas de referencia de gerentes y colegas de grandes proyectos de infraestructura.",
        note: "PDF",
      },
      view: "Ver",
      soon: "Próximamente",
      letter: "Carta",
    },
    journeyTitle: "Trayectoria Profesional",
    journeySubtitle: "Más de 25 años desarrollando soluciones desde la realidad de grandes proyectos de infraestructura.",
    available: "Disponible para posiciones estables, consultoría de largo plazo y proyectos especializados.",
    city: "Ciudad de Panamá – Panamá",
    whatsappText: "Hola Adriano, vi tu perfil profesional y me gustaría conversar.",
  },
  en: {
    role: "Professional Profile",
    nav: { profile: "Profile", experience: "Experience", documents: "Documents", contact: "Contact" },
    connect: "Let's connect",
    specialties: ["Project Controls", "Cost Analytics", "Claims", "Subcontracts", "Data & BI"],
    tagline:
      "25+ years supporting major infrastructure projects across Latin America, combining construction experience, data and technology.",
    badges: ["Stable Positions", "Expatriate Assignments", "Long-term Consulting", "Specialized Projects"],
    script: ["From", "construction", "data to", "better decisions"],
    stats: [
      { value: "25+", label: "years of experience" },
      { value: "8", label: "countries in Latin America" },
      { title: "Infrastructure projects", detail: "Roads | Metro | Ports | Airports | Hydro | Canals" },
      { title: "Project Controls & Data", detail: "Costs | Contracts | Claims | Subcontracts | BI" },
    ],
    profileTitle: "Professional Profile",
    profile: [
      "Senior professional with more than 25 years of experience supporting infrastructure projects across Latin America through project controls systems, cost and productivity analysis, subcontract administration, claims documentation and construction payroll controls.",
      "Extensive experience in large-scale engineering environments, integrating contractual, financial, technical and operational data to improve traceability, reporting and decision-making.",
    ],
    readMore: "Read more about my experience",
    docs: {
      cv: { title: "Curriculum Vitae", text: "Complete professional experience, skills, projects and technologies.", note: "PDF · ES · EN · PT · IT" },
      portfolio: { title: "Professional Portfolio", text: "Trajectory, main projects, solutions and results (ADATTA + Professional).", note: "PDF · ES · EN" },
      reference: {
        title: "Personal References",
        text: "Reference letters from managers and colleagues on major infrastructure projects.",
        note: "PDF",
      },
      view: "View",
      soon: "Coming soon",
      letter: "Letter",
    },
    journeyTitle: "Professional Journey",
    journeySubtitle: "More than 25 years developing solutions from the reality of major infrastructure projects.",
    available: "Available for permanent positions, long-term consulting and specialized projects.",
    city: "Panama City – Panama",
    whatsappText: "Hi Adriano, I saw your professional profile and would like to talk.",
  },
};

const badgeIcons: LucideIcon[] = [BriefcaseBusiness, Plane, BarChart3, Target];
const statIcons: LucideIcon[] = [Users, Globe, BarChart3, Settings];

const whatsappUrl = (text: string) => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`;

function DocButton({ href, label, soon }: { href: string | null; label: string; soon: string }) {
  if (!href) {
    return (
      <span className="inline-flex items-center justify-center gap-2 rounded-md bg-muted px-4 py-2 text-sm font-semibold text-muted-foreground">
        {soon}
      </span>
    );
  }
  return (
    <a
      href={docUrl(href)}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary/90"
    >
      <Download size={16} /> {label}
    </a>
  );
}

export function AdrianoPage() {
  const [lang, setLang] = useState<Lang>(() =>
    new URLSearchParams(window.location.search).get("lang") === "en" ? "en" : "es",
  );
  const l = t[lang];

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <div className="min-h-screen bg-white text-foreground">
      {/* Topo */}
      <header className="sticky top-0 z-40 border-b border-border bg-white/95 backdrop-blur">
        <div className="container flex items-center justify-between gap-4 py-3">
          <a href="/" className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary font-bold text-white">A</span>
            <span className="hidden sm:block border-l border-border pl-3 leading-tight">
              <span className="block text-sm font-bold text-primary">ADRIANO ALVES</span>
              <span className="block text-xs text-muted-foreground">{l.role}</span>
            </span>
          </a>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#perfil" className="hover:text-primary">{l.nav.profile}</a>
            <a href="#experiencia" className="hover:text-primary">{l.nav.experience}</a>
            <a href="#documentos" className="hover:text-primary">{l.nav.documents}</a>
            <a href="#contacto" className="hover:text-primary">{l.nav.contact}</a>
          </nav>
          <div className="flex items-center gap-2">
            {(["es", "en"] as const).map((code) => (
              <button
                key={code}
                onClick={() => setLang(code)}
                className={`rounded px-2.5 py-1 text-xs font-bold ${
                  lang === code ? "bg-primary text-white" : "bg-secondary text-foreground hover:bg-secondary/80"
                }`}
              >
                {code.toUpperCase()}
              </button>
            ))}
            <a
              href="#contacto"
              className="hidden sm:inline-flex items-center gap-2 rounded-md bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-700"
            >
              {l.connect} <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      {/*
        Topo: arte sem texto do usuário ("Engenheiro Observa Ponte ao Entardecer", 2170×725) e os textos em
        HTML por cima (trocam com ES/EN). Altura igual ao banner do site da empresa (py-24 md:py-32).
      */}
      <section id="perfil" className="relative overflow-hidden text-white">
        <img
          src="/adriano/hero.webp"
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-[75%_center]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b2545]/90 via-[#0b2545]/55 via-50% to-transparent to-80%" />
        <div className="container relative py-12 md:py-24">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight drop-shadow">ADRIANO ALVES</h1>
          <p className="mt-2 text-base md:text-lg text-white/95">
            {l.specialties.map((s, i) => (
              <span key={s}>
                {i > 0 && <span className="mx-2 text-sky-400">|</span>}
                {s}
              </span>
            ))}
          </p>
          <div className="mt-3 h-1 w-14 rounded-full bg-sky-500" />
          <p className="mt-3 max-w-2xl text-white/90">{l.tagline}</p>
          <div className="mt-5 inline-grid grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-2 rounded-lg bg-white/95 px-4 py-3 text-xs md:text-sm text-primary">
            {l.badges.map((b, i) => {
              const Icon = badgeIcons[i];
              return (
                <span key={b} className="inline-flex items-center gap-2 font-medium">
                  <Icon size={18} className="shrink-0" /> {b}
                </span>
              );
            })}
          </div>
        </div>
        {/* Frase manuscrita no céu, à direita do capacete — como nas artes ES/EN do usuário */}
        <div
          className="hidden lg:block absolute right-[1.5%] top-[10%] -rotate-[8deg] text-[#0d3c96]"
          style={{ fontFamily: "Caveat, cursive" }}
        >
          <p className="text-4xl xl:text-[2.75rem] font-bold leading-[0.95]">
            {l.script.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </p>
          <svg viewBox="0 0 220 24" className="mt-1 w-56 xl:w-64" aria-hidden="true">
            <path d="M4 20 C 70 12, 140 6, 216 3" stroke="#1e88e5" strokeWidth="5" fill="none" strokeLinecap="round" />
          </svg>
        </div>
      </section>

      {/* Números */}
      <section className="bg-secondary/40 py-8">
        <div className="container grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {l.stats.map((s, i) => {
            const Icon = statIcons[i];
            return (
              <div key={i} className="flex items-center gap-4">
                <Icon size={36} className="shrink-0 text-primary" />
                {"value" in s ? (
                  <div>
                    <p className="text-3xl font-extrabold text-primary leading-none">{s.value}</p>
                    <p className="text-sm uppercase text-muted-foreground">{s.label}</p>
                  </div>
                ) : (
                  <div>
                    <p className="font-bold uppercase text-primary leading-tight">{s.title}</p>
                    <p className="text-xs text-muted-foreground">{s.detail}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Perfil + documentos */}
      <section id="documentos" className="py-14 md:py-20">
        <div className="container grid gap-10 lg:grid-cols-2">
          <div>
            <div className="mb-3 h-1 w-10 rounded-full bg-sky-500" />
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-5" style={{ fontFamily: "Playfair Display" }}>
              {l.profileTitle}
            </h2>
            <div className="space-y-4 text-muted-foreground">
              {l.profile.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <a
              href="#experiencia"
              className="mt-6 inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary/90"
            >
              {l.readMore} <ArrowRight size={16} />
            </a>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="flex flex-col items-center rounded-xl border border-border bg-card p-5 text-center">
              <FileText size={34} className="mb-3 text-primary" />
              <h3 className="font-semibold text-primary">{l.docs.cv.title}</h3>
              <p className="mt-2 flex-1 text-sm text-muted-foreground">{l.docs.cv.text}</p>
              <div className="mt-4 grid w-full grid-cols-2 gap-2">
                {(Object.keys(cvFiles) as (keyof typeof cvFiles)[]).map((code) => (
                  <CvButton key={code} code={code} href={cvFiles[code]} />
                ))}
              </div>
              <p className="mt-2 text-xs text-muted-foreground">{l.docs.cv.note}</p>
            </div>

            <div className="flex flex-col items-center rounded-xl border border-border bg-card p-5 text-center">
              <FolderOpen size={34} className="mb-3 text-primary" />
              <h3 className="font-semibold text-primary">{l.docs.portfolio.title}</h3>
              <p className="mt-2 flex-1 text-sm text-muted-foreground">{l.docs.portfolio.text}</p>
              <div className="mt-4 grid w-full grid-cols-2 gap-2">
                {(Object.keys(portfolioFiles) as (keyof typeof cvFiles)[]).map((code) => (
                  <CvButton key={code} code={code} href={portfolioFiles[code] ?? null} />
                ))}
              </div>
              <p className="mt-2 text-xs text-muted-foreground">{l.docs.portfolio.note}</p>
            </div>

            <div className="flex flex-col items-center rounded-xl border border-border bg-card p-5 text-center">
              <UserCheck size={34} className="mb-3 text-primary" />
              <h3 className="font-semibold text-primary">{l.docs.reference.title}</h3>
              <p className="mt-2 flex-1 text-sm text-muted-foreground">{l.docs.reference.text}</p>
              <div className="mt-4 grid w-full grid-cols-2 gap-2">
                {referenceFiles.map((f, i) => (
                  <DocButton key={i} href={f} label={`${l.docs.letter} ${i + 1}`} soon={`${l.docs.letter} ${i + 1}`} />
                ))}
              </div>
              <p className="mt-2 text-xs text-muted-foreground">{l.docs.reference.note}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Linha do tempo (mesmos dados da Trayectoria da empresa) */}
      <section id="experiencia" className="bg-secondary/30 py-14 md:py-20">
        <div className="container">
          <div className="mb-3 h-1 w-10 rounded-full bg-sky-500" />
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-2" style={{ fontFamily: "Playfair Display" }}>
            {l.journeyTitle}
          </h2>
          <p className="mb-10 text-muted-foreground">{l.journeySubtitle}</p>

          {/*
            Layout do mockup "Trajetoria Arte - Adriano.png": anos/lugar | foto | projetos + tópicos | ícone + frase.
            Conteúdo e fotos próprios desta página (journey.ts), não os da Trayectoria do site.
          */}
          <ol className="relative ml-2 border-l-2 border-sky-500/40 md:ml-3">
            {journey.map((st) => (
              <li key={st.years} className="relative pl-6 md:pl-8 [&:not(:last-child)]:pb-4">
                <span className="absolute -left-[9px] top-5 h-4 w-4 rounded-full bg-sky-500 ring-4 ring-white" />
                <div className="grid gap-4 rounded-xl border border-border bg-white p-3 md:grid-cols-[11rem_15rem_1fr] lg:grid-cols-[12rem_17rem_1fr_11rem] md:items-center md:p-4">
                  <div className="md:pl-2">
                    <p className="text-2xl font-bold text-primary leading-tight">{st.years}</p>
                    <p className="text-lg font-bold text-primary leading-tight">{st.place[lang]}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{st.subtitle[lang]}</p>
                  </div>
                  <img
                    src={st.image}
                    alt={st.place[lang]}
                    loading="lazy"
                    className="h-40 w-full rounded-lg object-cover md:h-36"
                  />
                  <div>
                    <p className="font-bold text-primary">{st.projects[lang]}</p>
                    <ul className="mt-2 space-y-1">
                      {st.bullets[lang].map((sentence) => (
                          <li key={sentence} className="flex gap-2 text-sm text-muted-foreground">
                            <span className="mt-1.5 h-0 w-0 shrink-0 border-y-[4px] border-l-[6px] border-y-transparent border-l-primary" />
                            <span>{sentence}</span>
                          </li>
                        ))}
                    </ul>
                  </div>
                  <div className="flex items-center gap-3 rounded-lg bg-[#eaf2fb] p-4 md:col-span-3 lg:col-span-1 lg:h-full">
                    <img src={st.icon} alt="" className="h-12 w-12 shrink-0 object-contain" />
                    <p className="text-xs font-semibold uppercase leading-snug text-primary">{st.quote[lang]}</p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Disponibilidade */}
      <section className="relative overflow-hidden bg-[#7fb3e0] py-16 md:py-24">
        {/* Arte do usuário "Cidade Costeira ao Entardecer - Rodape Site Pessoal" (2170×725, sem texto) */}
        <img
          src="/adriano/banner.webp"
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-[center_40%]"
        />
        {/* Clareia só o céu à esquerda, para o texto azul-escuro */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/75 via-white/40 via-35% to-transparent to-60%" />
        <div className="container relative">
          <p className="max-w-2xl border-l-4 border-sky-500 pl-4 text-xl md:text-2xl font-bold text-primary">{l.available}</p>
        </div>
      </section>

      {/* Contato */}
      <footer id="contacto" className="bg-[#0b2545] py-8 text-white">
        <div className="container flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="grid gap-4 text-sm sm:grid-cols-2 lg:flex lg:gap-8">
            <a href={`mailto:${EMAIL}`} className="inline-flex items-center gap-2 hover:text-sky-300">
              <Mail size={18} /> {EMAIL}
            </a>
            <a href={whatsappUrl(l.whatsappText)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-sky-300">
              <MessageCircle size={18} /> {PHONE}
            </a>
            <span className="inline-flex items-center gap-2">
              <MapPin size={18} /> {l.city}
            </span>
            <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-sky-300">
              <Linkedin size={18} /> linkedin.com/in/adriano-alves-10446763
            </a>
          </div>
          <a
            href={whatsappUrl(l.whatsappText)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-md bg-sky-500 px-6 py-3 font-semibold text-white hover:bg-sky-600"
          >
            {l.connect} <ArrowRight size={18} />
          </a>
        </div>
      </footer>
    </div>
  );
}
