import { useEffect, useState } from "react";
import { CalendarDays, ExternalLink, Newspaper } from "lucide-react";

/**
 * Seções "Novedades en Tecnología" e "Un día como hoy".
 * Os dados vêm de /data/*.json, gerados diariamente no deploy por scripts/fetch-content.mjs.
 * Se o JSON não existir ou vier vazio, a seção simplesmente não aparece.
 */

interface NewsItem {
  title: string;
  link: string;
  date: string;
  image: string | null;
  source: string;
}

interface OnThisDayItem {
  year: number;
  kind: "event" | "birth" | "death";
  text: string;
  link: string | null;
  image: string | null;
}

const labels = {
  es: {
    newsTitle: "Novedades en Tecnología",
    newsSubtitle: "Lo último en Android, software e innovación",
    otdTitle: "Un día como hoy",
    otdSubtitle: "Curiosidades de la historia de la tecnología",
    birth: "Nace",
    death: "Fallece",
    source: "Fuente: Wikipedia",
  },
  en: {
    newsTitle: "Tech News",
    newsSubtitle: "The latest in Android, software and innovation (in Spanish)",
    otdTitle: "On this day",
    otdSubtitle: "Trivia from the history of technology (in Spanish)",
    birth: "Born",
    death: "Died",
    source: "Source: Wikipedia",
  },
};

function useJson<T>(url: string): T | null {
  const [data, setData] = useState<T | null>(null);
  useEffect(() => {
    fetch(url, { cache: "no-cache" })
      .then((r) => (r.ok ? r.json() : null))
      .then(setData)
      .catch(() => setData(null));
  }, [url]);
  return data;
}

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export function TechSections({ language }: { language: "es" | "en" }) {
  const l = labels[language];
  const news = useJson<{ items: NewsItem[] }>("/data/news.json");
  const otd = useJson<{ date: string; items: OnThisDayItem[] }>("/data/onthisday.json");

  const dateFmt = new Intl.DateTimeFormat(language === "es" ? "es-PA" : "en-US", { day: "numeric", month: "short" });
  const todayLabel = otd?.date
    ? new Intl.DateTimeFormat(language === "es" ? "es-PA" : "en-US", { day: "numeric", month: "long" }).format(
        new Date(2000, +otd.date.slice(0, 2) - 1, +otd.date.slice(3)),
      )
    : "";

  return (
    <>
      {news && news.items.length > 0 && (
        <section id="noticias" className="py-16 md:py-24 bg-white">
          <div className="container">
            <div className="mb-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-2" style={{ fontFamily: "Playfair Display" }}>
                {l.newsTitle}
              </h2>
              <p className="text-muted-foreground">{l.newsSubtitle}</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {news.items.map((n) => (
                <a
                  key={n.link}
                  href={n.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-white rounded-lg border border-border overflow-hidden hover:shadow-md transition-shadow duration-300 flex flex-col"
                >
                  {n.image ? (
                    <img src={n.image} alt="" loading="lazy" referrerPolicy="no-referrer" className="w-full h-44 object-cover" />
                  ) : (
                    <div className="w-full h-44 bg-secondary/40 flex items-center justify-center">
                      <Newspaper size={40} className="text-accent" />
                    </div>
                  )}
                  <div className="p-5 flex flex-col gap-3 flex-1">
                    <p className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-3">
                      {n.title}
                    </p>
                    <p className="mt-auto text-xs text-muted-foreground flex items-center gap-1">
                      {n.source} · {dateFmt.format(new Date(n.date))}
                      <ExternalLink size={12} />
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {otd && otd.items.length > 0 && (
        <section id="un-dia-como-hoy" className="py-16 md:py-24 bg-secondary/30">
          <div className="container">
            <div className="mb-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-2" style={{ fontFamily: "Playfair Display" }}>
                {l.otdTitle}
                {todayLabel && <span className="block text-lg md:text-xl font-normal text-accent mt-2">{todayLabel}</span>}
              </h2>
              <p className="text-muted-foreground">{l.otdSubtitle}</p>
            </div>

            <div className="max-w-3xl mx-auto space-y-4">
              {otd.items.map((e) => (
                <div key={e.text} className="bg-white rounded-lg p-5 border border-border flex gap-4 items-start">
                  <div className="w-16 flex-shrink-0 text-center">
                    <CalendarDays size={20} className="text-accent mx-auto mb-1" />
                    <span className="text-lg font-bold text-primary">{e.year}</span>
                  </div>
                  <p className="text-foreground flex-1">
                    {e.kind !== "event" && (
                      <span className="font-semibold">{e.kind === "birth" ? l.birth : l.death}: </span>
                    )}
                    {capitalize(e.text)}
                    {e.link && (
                      <a
                        href={e.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex ml-1 text-accent hover:text-primary align-middle"
                        aria-label="Wikipedia"
                      >
                        <ExternalLink size={14} />
                      </a>
                    )}
                  </p>
                </div>
              ))}
              <p className="text-xs text-muted-foreground text-center">{l.source}</p>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
