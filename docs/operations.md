# Operatività, deploy e analytics

## Build e deploy

Il progetto genera un sito statico in `dist/`:

```bash
npm ci
npm run build
```

Astro usa `SITE.url` come origine pubblica, URL senza slash finale e output HTML in formato file. `vercel.json` abilita gli URL puliti e disabilita lo slash finale.

Prima del deploy verificare che l'ambiente usi Node.js 22, installi con `npm ci` ed esegua almeno `npm run check`. La CI esegue anche Playwright sulle pull request e sui push a `main`.

## Dominio, canonical e sitemap

Il dominio ufficiale è in `src/config/site.ts`. È usato per sitemap, canonical, immagini social e identificatori JSON-LD.

Dopo un cambio di dominio o struttura URL:

1. eseguire `npm run check`;
2. ispezionare canonical e `og:url` nelle pagine generate;
3. controllare `dist/sitemap-index.xml` e le sitemap collegate;
4. configurare i redirect permanenti necessari;
5. verificare strumenti per webmaster e anteprime social.

## Analytics

L'integrazione è centralizzata in `src/components/Analytics.astro`, incluso nel layout principale e nella pagina 404. Configura Google Consent Mode v2, Iubenda, Google Analytics 4, Google Ads, Google Tag Manager e la conversione dei link telefonici.

| Servizio                       | Identificativo         |
| ------------------------------ | ---------------------- |
| Iubenda site ID                | `3774052`              |
| Iubenda cookie policy ID       | `34164499`             |
| GA4                            | `G-ZSYEEGY2J7`         |
| Google Ads                     | `AW-16456523599`       |
| Etichetta conversione chiamata | `hG7fCL_g-L8bEM--iqc9` |
| Google Tag Manager             | `GTM-NPF3KJV6`         |

Sono identificativi pubblici inseriti negli script client, non segreti. Restano configurazione di produzione: una modifica errata interrompe misurazione o consenso.

## Ordine del consenso

L'ordine degli script è intenzionale:

1. vengono inizializzati `dataLayer` e `gtag`;
2. tutte le categorie Google partono da `denied`;
3. Iubenda viene configurato e caricato con prior blocking;
4. vengono caricati e configurati i tag Google.

Iubenda aggiorna il consenso tramite `googleConsentMode: true`. Non spostare i tag Google prima dell'inizializzazione del consenso e non aggiungere tag di marketing nei singoli componenti.

Il fallback `<noscript>` di GTM è deliberatamente assente: senza JavaScript la CMP non può acquisire il consenso prima del container.

## Conversione delle chiamate

Un listener delegato intercetta tutti i link `href="tel:..."`. Per un clic primario senza tasti modificatori:

1. impedisce temporaneamente la navigazione;
2. invia l'evento con `window.gtag_report_conversion()`;
3. apre il dialer nella callback;
4. usa un fallback di 1200 ms se la callback non arriva.

Il listener copre anche link aggiunti in futuro. Non aggiungere handler `onclick` ai singoli componenti. Il numero principale è centralizzato in `src/config/site.ts`.

## Verifica manuale

Usare un ambiente autorizzato e senza estensioni che blocchino i tag:

1. aprire DevTools e la scheda Network;
2. caricare una pagina senza accettare i cookie e verificare lo stato iniziale;
3. accettare le categorie di misurazione nel banner Iubenda;
4. filtrare per `google`, `collect` o `conversion`;
5. cliccare un link telefonico;
6. verificare l'invio a `AW-16456523599/hG7fCL_g-L8bEM--iqc9` e l'apertura del dialer;
7. ripetere da header mobile, contatti e pagina di un medico.

Controllare poi la diagnostica in Google Ads e l'anteprima di Google Tag Manager, considerando i normali ritardi delle piattaforme.

## Modifiche ad alto rischio

Richiedono revisione e prova manuale prima del deploy: ordine degli script di consenso, ID analytics, link `tel:`, dominio canonico, slug, redirect ed embed esterni.

Non inserire chiavi private o credenziali nel repository. Per futuri segreti server-side usare le variabili protette della piattaforma e documentare solo nome e finalità.
