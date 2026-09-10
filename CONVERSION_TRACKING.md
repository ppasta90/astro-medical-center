# Google Ads Conversion Tracking - Evento "Contatto"

## Implementazione

Il tracking delle chiamate è centralizzato in `src/components/Analytics.astro` e si
applica automaticamente a tutti i link con `href="tel:..."`, inclusi quelli
renderizzati dai componenti Astro.

### ID Conversione
- **Conversion ID**: `AW-16456523599`
- **Conversion Label**: `hG7fCL_g-L8bEM--iqc9`

### Copertura

- Hero e sezione contatti
- Header desktop e menu mobile
- Card degli specialisti
- Pagine dei medici
- Pagina "Lavora con noi"
- Qualsiasi futuro link telefonico inserito nel layout principale

## Come funziona il tracking

Quando un utente clicca su un link telefonico:

1. Il listener delegato intercetta il link `tel:`.
2. `window.gtag_report_conversion()` accoda l'evento Google Ads.
3. La chiamata viene aperta tramite `event_callback`.
4. Un fallback di 1200 ms garantisce comunque l'apertura del dialer se il tag
   non richiama la callback.

## Numeri di telefono tracciati

- **Numero principale**: `+390574027087` (Centro Medico Agliana)
- Il recapito è definito una sola volta in `src/config/site.ts` e riutilizzato
  da tutti i componenti.

## Verifica del tracking

Per verificare che il tracking funzioni:

1. Apri Chrome DevTools (F12)
2. Vai alla scheda "Network"
3. Filtra per "conversion" o "google"
4. Accetta i cookie di misurazione nel banner Iubenda
5. Clicca su uno dei pulsanti telefonici
6. Verifica la richiesta di conversione e il valore `send_to`

Oppure in Google Ads:
1. Vai a "Strumenti" → "Conversioni"
2. Seleziona la conversione "Contatto"
3. Controlla il numero di conversioni registrate

## Note importanti

- `gtag` e `gtag_report_conversion` sono esposti esplicitamente su `window`.
- Gli handler non sono duplicati nei singoli componenti.
- Il Consent Mode v2 parte con tutte le categorie Google impostate su `denied`.
- Iubenda è inizializzato prima di GA4, Google Ads e Google Tag Manager e aggiorna
  il consenso tramite `googleConsentMode: true`.
- Il fallback `<noscript>` di GTM è omesso: senza JavaScript la CMP non potrebbe
  acquisire il consenso prima del caricamento del container.
- La stessa configurazione è usata anche dalla pagina 404.
