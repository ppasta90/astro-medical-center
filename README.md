# Centro Medico Agliana

Sito istituzionale del Centro Medico Agliana, realizzato con Astro 5 e generato come sito statico. Presenta il centro, i servizi, gli specialisti e le modalità di contatto e prenotazione.

## Stack

- Astro 5 e TypeScript in modalità strict
- Tailwind CSS 3
- Content Collections con sorgente JSON e validazione Zod
- Playwright e axe-core per smoke test e accessibilità
- ESLint e Prettier per la qualità del codice
- Vercel per la pubblicazione

Il sito usa componenti Astro e JavaScript nativo, senza framework client-side.

## Requisiti

- Node.js 22, la stessa versione usata dalla CI
- npm, con dipendenze bloccate in `package-lock.json`

## Avvio rapido

```bash
npm ci
npm run dev
```

Il server di sviluppo è disponibile su `http://localhost:4321`.

## Comandi principali

| Comando                    | Descrizione                                                                 |
| -------------------------- | --------------------------------------------------------------------------- |
| `npm run dev`              | Avvia il server di sviluppo.                                                |
| `npm run build`            | Esegue `astro check` e genera il sito in `dist/`.                           |
| `npm run preview`          | Serve localmente la build presente in `dist/`.                              |
| `npm run check`            | Esegue lint, formato, validazione dati, build e controllo dei link interni. |
| `npm run test:unit`        | Esegue i test di dominio e dei budget della build.                          |
| `npm run test:e2e`         | Esegue gli smoke test Playwright sulla build.                               |
| `npm run test:performance` | Misura le route principali con Lighthouse CI.                               |
| `npm test`                 | Esegue l'intera suite di qualità e i test end-to-end.                       |

Per una nuova installazione usare `npm ci`. `npm install` è appropriato quando si vogliono modificare le dipendenze e aggiornare il lockfile.

## Struttura essenziale

```text
src/
├── components/       componenti Astro riutilizzabili
├── config/           dati globali del centro
├── data/             contenuti TypeScript, come le FAQ
├── db/data.json      archivio degli specialisti
├── images/           immagini elaborate dalla pipeline di Astro
├── layouts/          layout condiviso, SEO e dati strutturati
├── lib/              funzioni per dati e routing
├── pages/            route del sito
└── styles/           stile globale e classi condivise
public/               asset pubblicati senza trasformazioni
scripts/              validazioni eseguite dalla pipeline di qualità
tests/                test Playwright e controlli di accessibilità
```

Le schede dei medici sono generate durante la build dalla route `src/pages/[slug].astro`. Ogni voce di `src/db/data.json` produce una pagina alla radice del sito, per esempio `/romani-endocrinologa`.

## Documentazione

- [Architettura](docs/architecture.md): pagine, componenti, dati, SEO e asset.
- [Sviluppo e qualità](docs/development.md): workflow locale, test, CI e convenzioni.
- [Gestione dei contenuti](docs/content-management.md): medici, immagini, FAQ e dati del centro.
- [Operatività](docs/operations.md): deploy, dominio, analytics, consenso e conversioni.

## Prima di aprire una pull request

```bash
npm test
```

Per modifiche visive controllare anche le pagine interessate su viewport desktop e mobile. Le modifiche ad analytics, consenso, link telefonici o URL canonici richiedono inoltre una verifica manuale in browser.
