# Sviluppo e qualità

## Configurazione locale

Il progetto usa Node.js 22 in CI. Per riprodurre lo stesso ambiente:

```bash
git clone <url-repository>
cd astro-medical-center
npm ci
npm run dev
```

Aprire `http://localhost:4321`. Non sono richieste variabili d'ambiente per avvio o build: gli identificativi pubblici e i dati del sito sono attualmente definiti nel codice.

## Workflow consigliato

1. Creare un branch focalizzato sulla modifica.
2. Avviare `npm run dev` e modificare i file interessati.
3. Eseguire durante lo sviluppo il controllo più vicino alla modifica.
4. Eseguire `npm test` prima della pull request.
5. Verificare manualmente desktop e mobile per ogni cambiamento visibile.

Per modifiche ai soli dati dei medici, `npm run check:data` offre feedback rapido. Per pagine, navigazione, SEO o componenti interattivi eseguire anche i test end-to-end.

## Comandi di qualità

| Comando                    | Controlli eseguiti                                           |
| -------------------------- | ------------------------------------------------------------ |
| `npm run lint`             | ESLint su JavaScript, TypeScript e Astro.                    |
| `npm run format:check`     | Verifica Prettier sui file inclusi nello script.             |
| `npm run check:data`       | Integrità del catalogo medici e delle immagini.              |
| `npm run test:unit`        | Test veloci di schema, catalogo, route e budget della build. |
| `npm run astro -- check`   | Diagnostica Astro e TypeScript.                              |
| `npm run build`            | Diagnostica Astro e generazione di `dist/`.                  |
| `npm run check:bundle`     | Budget di 100 KiB per il JavaScript generato.                |
| `npm run check:links`      | Link, asset e frammenti interni della build.                 |
| `npm run check:routes`     | Presenza di una pagina statica per ogni medico.              |
| `npm run check`            | Controlli statici, build contract e test unitari.            |
| `npm run test:e2e`         | Smoke test, interazioni e accessibilità con Chromium.        |
| `npm run test:performance` | Build e budget Lighthouse sulle route rappresentative.       |
| `npm test`                 | `npm run check` seguito dai test end-to-end.                 |

`check:links` richiede una build recente in `dist/`; per questo lo script `check` lo esegue dopo `build`.

## Test end-to-end

`playwright.config.ts` avvia `npm run preview -- --host 127.0.0.1` e usa la build statica su `http://127.0.0.1:4321`. Prima della prima esecuzione locale può servire:

```bash
npx playwright install chromium
npm run test:e2e
```

I test in `tests/smoke.spec.ts` verificano:

- risposta HTTP, presenza dell'`h1` e assenza di violazioni axe `serious` o `critical` sulle route principali;
- menu mobile, carosello e filtro delle specializzazioni;
- canonical, metadati social e JSON-LD;
- direttiva `noindex` della pagina 404.

Le richieste esterne sono bloccate nei test per renderli indipendenti da Iubenda, Google e Doctolib.

## Integrazione continua

`.github/workflows/quality.yml` viene eseguito sulle pull request e sui push a `main`. Espone job distinti per qualità statica, unit test, browser test e performance, tutti su Node.js 22. I report Lighthouse sono allegati come artifact anche quando un budget fallisce.

Il job sul titolo rifiuta soltanto titoli generici come `Dev`, `Update`, `Changes` e `WIP`, oppure più corti di 12 caratteri. I prefissi come `feat:` e `fix:` restano consigliati, non obbligatori.

Lighthouse applica una baseline di Performance 90, Accessibilità 95, SEO 95, LCP 2,5 secondi, CLS 0,1, 1.500 KiB totali e 500 KiB di JavaScript comprensivo di Iubenda e Google. Sono misure di laboratorio ripetibili, non Core Web Vitals reali: i dati sul campo richiedono una sorgente RUM o il Chrome UX Report.

## Convenzioni

- TypeScript quando possibile, doppi apici, punto e virgola e indentazione a due spazi.
- Componenti Astro riutilizzabili in PascalCase; file di route in minuscolo.
- Alias `@/*` per le importazioni da `src/`.
- Utility Tailwind accanto al markup; token condivisi in `tailwind.config.mjs`.
- Informazioni del centro centralizzate in `src/config/site.ts`.
- JavaScript client-side piccolo e accessibile, senza introdurre un framework per interazioni locali.

## Verifiche manuali sensibili

I test automatici non sostituiscono il controllo manuale di consenso cookie, caricamento dei tag, conversione dei link `tel:`, link esterni, layout responsive e canonical dopo cambi di dominio o URL. Vedere [Operatività](operations.md).
