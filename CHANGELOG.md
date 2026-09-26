# Changelog — Site institucional Adatta (www.adattati.com)

## 2026-09-26 — Produtos: novas artes e nova ordem

- Artes novas de **PayRoll**, **SisGep** e **ACM** (origem: `adatta-site-com-imagens/Novas imgs`):
  card = recorte 1254×860 reduzido para 840×576; detalhe (`-full`) = arte quadrada completa 1254×1254.
- Ordem dos produtos: PayRoll, SisGep, ACM, Tools, Daily, Tracking, Contract, Cost, Budget, INSP, Lab, Doctor.

## 2026-09-25 — Publicação e reformulação

### Publicação
- Site publicado no GitHub Pages (repo público `AdattaTec/AdattaTec.github.io`), deploy automático por
  GitHub Actions a cada push em `main` e diariamente às 00:30 (Panamá).
- Domínio `www.adattati.com` com HTTPS; `adattati.com` redireciona para o `www`.
- DNS (UOL): apenas `www` (CNAME `adattatec.github.io`) e apex (A `185.199.108-111.153`) apontam para o
  GitHub. `api`, `s1`, `devicemanager`, `releasenotes`, `api-workmanager` e o e-mail (MX Google) não mudaram.

### Conteúdo
- **Asesoría** (nova): Datos de Proyecto y Preparación para Reclamos (Claims Readiness), Project Controls e
  Outsourcing de Nómina, com as artes oficiais e botão de conversa pelo WhatsApp.
- **Servicios**: os 12 serviços reais do portfólio (nome + alcance, ES/EN), no lugar de 4 itens genéricos.
- **Sobre**: texto institucional novo, Misión e valores (Calidad, Confiabilidad, Profesionalismo), com a arte
  "Servicios Integrados para Proyectos".
- **Trayectoria** (nova): +25 anos, +30 projetos, 8 países e linha do tempo 1998–2026.
- **Novedades en Tecnología** e **Un día como hoy** (novas): atualizadas diariamente por
  `scripts/fetch-content.mjs` (RSS Xataka, MuyComputer, Androidsis; Wikipedia em espanhol), sem cadastro.
- **Contacto**: formulário removido (dependia de chave Web3Forms nunca configurada); agora WhatsApp
  (+507-6115-2158) e e-mail `adatta@adattati.com`.
- **PayRoll**: "impresión de correos" corrigido para "impresión de carnés"; EN "Template D1" → "Planilla 03".

### Visual
- Produtos: artes novas no card (versão simples) e no detalhe (versão completa), sem logo e sem URL.
- Topo com foto da capa do portfólio (a anterior tinha texto em português embutido).
- Todas as imagens hospedadas no próprio site (antes duas vinham da CDN do Manus) e convertidas para WebP.

### Celular
- Menu ☰; carrosséis deslizáveis com o dedo; setas só no desktop; sem rolagem lateral.
- Corrigido 3º card cortado no carrossel do desktop.
