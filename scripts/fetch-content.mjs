// Gera client/public/data/news.json e onthisday.json antes do build.
// Roda no GitHub Actions (diário). Sem chaves de API: RSS públicos + Wikipedia "onthisday".
// Se uma fonte falhar, reaproveita o JSON publicado no site para não deixar a seção vazia.
import fs from "node:fs/promises";
import path from "node:path";

const OUT_DIR = path.resolve(import.meta.dirname, "..", "client", "public", "data");
const LIVE_BASE = "https://www.adattati.com/data";
const UA = "adatta-site/1.0 (+https://www.adattati.com; adatta@adattati.com)";

const FEEDS = [
  { source: "Androidsis", url: "https://www.androidsis.com/feed/" },
  { source: "Xataka", url: "https://www.xataka.com/feedburner.xml" },
  { source: "MuyComputer", url: "https://www.muycomputer.com/feed/" },
];
// Alguns feeds param de ser atualizados sem aviso; só entram notícias recentes
const MAX_AGE_DAYS = 10;
const NEWS_LIMIT = 6;
const OTD_LIMIT = 4;

// Eventos: palavras que indicam TI de fato (evita "televisión" genérico etc.)
const TECH_EVENT = new RegExp(
  [
    "comput", "ordenador", "software", "internet", "inform[aá]tic", "microsoft", "apple", "google",
    "\\bibm\\b", "\\bintel\\b", "linux", "unix", "android", "iphone", "videojuego", "consola",
    "nintendo", "playstation", "sega\\b", "lenguaje de programaci", "microprocesador", "transistor",
    "(lanza|lanzamiento)[^.]*sat[eé]lite", "sat[eé]lite (artificial|de comunicaciones|geoestacionario)", "inteligencia artificial", "hacker", "correo electr[oó]nico", "world wide web",
    "sitio web", "red social", "facebook", "twitter", "amazon\b", "wikipedia", "televisi[oó]n digital",
    "cable (submarino|transatl[aá]ntico|telef[oó]nico)", "telegraf", "arpanet", "smartphone", "tel[eé]fono m[oó]vil",
  ].join("|"),
  "i",
);
// Nascimentos/mortes: só profissões de TI na descrição
const TECH_PERSON = /(inform[aá]tic|cient[ií]fic[oa] de (la )?computaci|computaci[oó]n|computador|programador|ingenier[oa] de software|criptógraf|empresari[oa] .*tecnolog|fundador de (microsoft|apple|google|intel|amazon|facebook))/i;

const pad = (n) => String(n).padStart(2, "0");

function panamaToday() {
  const parts = new Intl.DateTimeFormat("en-CA", { timeZone: "America/Panama", year: "numeric", month: "2-digit", day: "2-digit" })
    .formatToParts(new Date());
  const get = (t) => parts.find((p) => p.type === t).value;
  return { year: +get("year"), month: +get("month"), day: +get("day") };
}

async function get(url, as = "text") {
  const res = await fetch(url, { headers: { "User-Agent": UA }, signal: AbortSignal.timeout(30000) });
  if (!res.ok) throw new Error(`${url} -> HTTP ${res.status}`);
  return as === "json" ? res.json() : res.text();
}

function decode(s) {
  return s
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(+n))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&quot;/g, '"').replace(/&apos;|&#39;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ").replace(/&amp;/g, "&")
    .trim();
}

const tag = (xml, name) => {
  const m = xml.match(new RegExp(`<${name}[^>]*>([\\s\\S]*?)</${name}>`, "i"));
  return m ? decode(m[1]) : "";
};

function parseRss(xml, source) {
  const items = xml.match(/<item[\s>][\s\S]*?<\/item>/gi) ?? [];
  return items.map((it) => {
    // Imagem: media/enclosure; senão a primeira <img> da descrição ou do content:encoded
    const image =
      it.match(/<(?:media:content|media:thumbnail|enclosure)[^>]+url="([^"]+)"/i)?.[1] ??
      decode(it).match(/<img[^>]+src="([^"]+)"/i)?.[1] ??
      null;
    return {
      title: tag(it, "title").replace(/<[^>]+>/g, ""),
      link: tag(it, "link"),
      date: new Date(tag(it, "pubDate")).toISOString(),
      image,
      source,
    };
  }).filter((n) => n.title && /^https?:\/\//.test(n.link));
}

async function buildNews() {
  const results = await Promise.allSettled(FEEDS.map(async (f) => parseRss(await get(f.url), f.source)));
  results.forEach((r, i) => r.status === "rejected" && console.warn(`feed ${FEEDS[i].source}: ${r.reason}`));
  // Alterna as fontes (a mais recente de cada, depois a segunda...) para nenhuma dominar a lista
  const minDate = new Date(Date.now() - MAX_AGE_DAYS * 864e5).toISOString();
  const perFeed = results
    .map((r) => (r.status === "fulfilled" ? r.value.filter((n) => n.date >= minDate) : []))
    .map((list) => list.sort((a, b) => b.date.localeCompare(a.date)))
    .filter((list) => list.length > 0);
  if (perFeed.length === 0) throw new Error("nenhum feed respondeu");
  const seen = new Set();
  const items = [];
  for (let i = 0; items.length < NEWS_LIMIT && perFeed.some((list) => i < list.length); i++) {
    for (const list of perFeed) {
      const n = list[i];
      if (n && items.length < NEWS_LIMIT && !seen.has(n.link)) {
        seen.add(n.link);
        items.push(n);
      }
    }
  }
  items.sort((a, b) => b.date.localeCompare(a.date));
  return { updated: new Date().toISOString(), items };
}

async function buildOnThisDay({ month, day }) {
  const j = await get(`https://api.wikimedia.org/feed/v1/wikipedia/es/onthisday/all/${pad(month)}/${pad(day)}`, "json");
  const pick = (e, kind) => {
    const page = e.pages?.[0];
    return {
      year: e.year,
      kind,
      text: e.text,
      link: page?.content_urls?.desktop?.page ?? null,
      image: page?.thumbnail?.source ?? null,
    };
  };
  const events = [...(j.selected ?? []), ...(j.events ?? [])]
    .filter((e) => TECH_EVENT.test(e.text))
    .map((e) => pick(e, "event"));
  const people = [...(j.births ?? []).map((e) => [e, "birth"]), ...(j.deaths ?? []).map((e) => [e, "death"])]
    .filter(([e]) => TECH_PERSON.test(e.text + " " + (e.pages?.[0]?.description ?? "")))
    .map(([e, kind]) => pick(e, kind));
  const seen = new Set();
  const items = [...events, ...people]
    .filter((e) => !seen.has(e.text) && seen.add(e.text))
    .slice(0, OTD_LIMIT);
  return { date: `${pad(month)}-${pad(day)}`, items };
}

async function write(name, build) {
  let data;
  try {
    data = await build();
    console.log(`${name}: ${data.items.length} itens`);
  } catch (e) {
    console.warn(`${name}: falhou (${e.message}), usando versão publicada`);
    try {
      data = await get(`${LIVE_BASE}/${name}`, "json");
    } catch {
      data = { items: [] };
    }
  }
  await fs.writeFile(path.join(OUT_DIR, name), JSON.stringify(data, null, 2));
}

await fs.mkdir(OUT_DIR, { recursive: true });
// OTD_DATE=MM-DD permite testar outra data localmente
const today = process.env.OTD_DATE
  ? { month: +process.env.OTD_DATE.slice(0, 2), day: +process.env.OTD_DATE.slice(3) }
  : panamaToday();
await write("news.json", buildNews);
await write("onthisday.json", () => buildOnThisDay(today));
