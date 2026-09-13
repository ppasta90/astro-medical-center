# Architettura

## Panoramica

Il progetto è un sito Astro generato staticamente. La build trasforma tutte le route note e tutte le schede dei medici in file HTML, pubblicabili senza un server applicativo.

```text
src/db/data.json
    │ schema in src/domain/doctor.ts + validazione catalogo
    ▼
src/lib/doctors.ts
    │ ordinamento per `order`
    ├──► src/pages/specializzazioni.astro
    └──► src/pages/[slug].astro ──► una pagina statica per medico
```

## Routing

| File                     | URL                 | Responsabilità                                      |
| ------------------------ | ------------------- | --------------------------------------------------- |
| `index.astro`            | `/`                 | Homepage, carosello, servizi, sede, contatti e FAQ. |
| `specializzazioni.astro` | `/specializzazioni` | Elenco e filtro degli specialisti.                  |
| `[slug].astro`           | `/<slug-medico>`    | Profilo statico di ciascun medico.                  |
| `lavora-con-noi.astro`   | `/lavora-con-noi`   | Informazioni per le candidature.                    |
| `404.astro`              | `/404.html`         | Pagina di errore esclusa dall'indicizzazione.       |

`getStaticPaths()` in `[slug].astro` legge la collection `doctors` e definisce le pagine dinamiche durante la build. Il progetto usa URL senza estensione e senza slash finale; `astro.config.mjs` e `vercel.json` mantengono coerente questo comportamento.

`src/lib/routes.ts` normalizza il pathname prima che layout e navigazione lo usino, gestendo anche gli equivalenti `.html`.

## Layout e componenti

`src/layouts/Layout.astro` è il contenitore condiviso delle pagine ordinarie. Include header, footer, stile globale, font locali, analytics, consenso, metadati social, canonical e dati strutturati JSON-LD.

La pagina 404 ha un documento HTML autonomo, ma include lo stesso componente `Analytics.astro`. I componenti in `src/components/` sono presentazionali o gestiscono una singola interazione. Menu mobile, filtro, FAQ e carosello usano JavaScript browser senza framework client-side.

I dati condivisi non devono essere duplicati nei componenti: le informazioni del centro provengono da `src/config/site.ts`, i medici dalla collection e le FAQ da `src/data/faqs.ts`.

## Dati dei medici

`src/content.config.ts` registra la collection `doctors` usando il file loader di Astro. Lo schema Zod condiviso in `src/domain/doctor.ts` controlla tipi, campi obbligatori, specializzazioni, formato degli slug e modalità di prenotazione.

`src/lib/doctors.ts` espone `getDoctors()` e ordina i record per `order`. Il tipo consumato dalle pagine si trova in `src/types/doctor.ts`.

La validazione è complementare:

- la Content Collection verifica forma e vincoli del singolo record;
- `src/domain/doctor-catalog.ts` contiene le regole pure sull'intero catalogo;
- `scripts/check-data.ts` applica tali regole a unicità, immagini mancanti, orfane e fuori budget;
- `scripts/check-routes.ts` verifica che ogni slug produca una pagina statica.

La prenotazione è un confine esterno: ogni medico dichiara una variante `external` con URL oppure `phone`. Il sito non conserva appuntamenti e non implementa sovrapposizioni di calendario. Le motivazioni sono registrate negli ADR in `docs/adr/`.

La procedura editoriale è descritta in [Gestione dei contenuti](content-management.md).

## SEO e dati strutturati

`Layout.astro` crea un canonical assoluto da `SITE.url` e dal percorso normalizzato. La homepage aggiunge uno schema `FAQPage`; le pagine dei medici aggiungono `Physician`. Tutte le pagine ordinarie includono anche `MedicalClinic`.

`@astrojs/sitemap` genera la sitemap dall'URL configurato in `src/config/site.ts`; `public/robots.txt` è copiato invariato nell'output. Cambi a dominio, slug o struttura delle pagine richiedono una verifica coordinata di canonical, sitemap, dati strutturati, link interni e test.

## Asset e stile

- `src/images/` contiene asset importati ed elaborati da Astro.
- `public/` contiene favicon, manifest e immagini dei medici servite con percorso stabile.
- `tailwind.config.mjs` definisce font, colori e breakpoint condivisi.
- `src/styles/globals.css` contiene stile globale e classi riutilizzate.

Le immagini dei medici devono essere WebP e risiedere in `public/doctors-images/`. Le altre immagini dovrebbero essere importate da `src/images/` quando possono beneficiare dell'ottimizzazione di Astro.

Il JavaScript generato ha un budget di 100 KiB verificato sulla build. Lighthouse CI misura inoltre le tre route rappresentative e applica budget a punteggi, LCP, CLS, trasferimento totale e JavaScript comprensivo dei fornitori terzi.
