# Site institucional Adatta — www.adattati.com

React + Vite + Tailwind (gerado originalmente no Manus). Site estático, publicado no GitHub Pages.

## Publicar
Push em `main` → GitHub Actions (`.github/workflows/deploy.yml`) roda `scripts/fetch-content.mjs`,
`vite build` e publica `dist/public`. Leva ~40 s. O mesmo workflow roda todo dia às 05:30 UTC
(00:30 Panamá) para atualizar notícias e "Un día como hoy".

O navegador guarda a página por até ~10 min (cache do Pages): use Ctrl+F5 ou aba anônima para ver mudanças.

## Rodar local
```
pnpm install
node scripts/fetch-content.mjs   # gera client/public/data/*.json (fora do git)
pnpm exec vite build
pnpm exec vite preview --port 4173
```
`OTD_DATE=MM-DD node scripts/fetch-content.mjs` testa "Un día como hoy" de outra data.

## Onde fica cada coisa
- `client/src/pages/Home.tsx` — página, textos ES/EN (`translations`), produtos e serviços.
- `client/src/components/Asesoria.tsx` — seção Asesoría.
- `client/src/components/Trayectoria.tsx` — números e linha do tempo.
- `client/src/components/TechSections.tsx` — Novedades e Un día como hoy.
- `client/public/images/` — imagens (WebP). Origem das artes: `C:\temp_adatta\_delete\NovasImgAdatta`
  e `C:\tmpAdex`; recortadas com ffmpeg para remover logo e URL.

## DNS (UOL)
Só `www` (CNAME `adattatec.github.io`) e o apex (A `185.199.108.153`, `.109`, `.110`, `.111`) apontam
para o GitHub. Não alterar `api`, `s1`, `devicemanager`, `releasenotes`, `api-workmanager` nem MX.

Histórico de mudanças: `CHANGELOG.md`.
