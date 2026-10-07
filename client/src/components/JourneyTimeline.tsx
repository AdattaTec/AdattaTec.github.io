import { journey } from "./journey";

// "**BIM**" → destaque; o resto do texto fica normal
const highlight = (text: string) =>
  text.split(/\*\*(.+?)\*\*/).map((part, i) =>
    i % 2 === 1 ? (
      <strong key={i} className="rounded bg-sky-100 px-1 font-bold text-primary">
        {part}
      </strong>
    ) : (
      part
    ),
  );

/**
 * Cards da linha do tempo (anos/lugar | foto | projetos + tópicos | ícone + frase), iguais na Trayectoria
 * do site e na Experiencia da página /adriano.
 */
export function JourneyTimeline({ lang }: { lang: "es" | "en" }) {
  return (
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
              className={`h-40 w-full rounded-lg object-cover md:h-36 ${st.imagePosition ?? ""}`}
            />
            <div>
              <p className="font-bold text-primary">{st.projects[lang]}</p>
              <ul className="mt-2 space-y-1">
                {st.bullets[lang].map((sentence) => (
                  <li key={sentence} className="flex gap-2 text-sm text-muted-foreground">
                    <span className="mt-1.5 h-0 w-0 shrink-0 border-y-[4px] border-l-[6px] border-y-transparent border-l-primary" />
                    <span>{highlight(sentence)}</span>
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
  );
}
