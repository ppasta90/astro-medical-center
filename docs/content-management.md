# Gestione dei contenuti

## Informazioni del centro

`src/config/site.ts` è la fonte unica per nome, dominio, dati societari, contatti, indirizzo, coordinate, orari, prenotazione e profili social.

Quando si modifica questo file, verificare header, footer, contatti, pagina “Lavora con noi”, metadati, JSON-LD, FAQ, link telefonici e tracking. Se cambia `SITE.url`, controllare anche sitemap e canonical.

## Aggiungere o modificare un medico

I medici sono definiti nell'array di `src/db/data.json`.

| Campo             | Regola                                                                       |
| ----------------- | ---------------------------------------------------------------------------- |
| `id`              | Slug univoco, minuscolo, con lettere, numeri e trattini.                     |
| `order`           | Intero positivo e univoco che determina l'ordine.                            |
| `slug`            | Uguale a `id`; diventa l'URL `/<slug>`.                                      |
| `honorific`       | Esattamente `Dott.` oppure `Dott.ssa`.                                       |
| `professionTitle` | Titolo professionale mostrato e usato nei metadati.                          |
| `name`            | Nome del professionista.                                                     |
| `surname`         | Cognome del professionista.                                                  |
| `image`           | Percorso `doctors-images/<nome>.webp`.                                       |
| `bio`             | Biografia non vuota di almeno 20 caratteri.                                  |
| `specialization`  | Valore presente nel catalogo `SPECIALIZATIONS` in `src/domain/doctor.ts`.    |
| `services`        | Array di prestazioni non vuote; l'array può essere vuoto.                    |
| `booking`         | `{ "kind": "external", "url": "https://..." }` oppure `{ "kind": "phone" }`. |

Esempio:

```json
{
  "id": "rossi-dermatologa",
  "order": 20,
  "slug": "rossi-dermatologa",
  "honorific": "Dott.ssa",
  "professionTitle": "Dermatologa",
  "name": "Maria",
  "surname": "Rossi",
  "image": "doctors-images/rossi.webp",
  "bio": "Biografia professionale completa della specialista.",
  "specialization": "Dermatologia",
  "services": ["visita dermatologica", "mappatura dei nei"],
  "booking": { "kind": "phone" }
}
```

Salvare la fotografia come `public/doctors-images/rossi.webp`. Il nome deve contenere solo lettere minuscole, numeri e trattini. Usare una foto nitida, con soggetto centrato e adatta a un ritaglio quadrato.

Eseguire quindi:

```bash
npm run check:data
npm run build
```

Aprire infine `/<slug>` e `/specializzazioni`, provare il filtro e controllare fotografia, testo, servizi e prenotazione.

### Rinominare uno slug

Cambiare `id` e `slug` cambia l'URL pubblico. Valutare un redirect permanente dal vecchio URL per conservare link esterni e valore SEO. Il repository non definisce attualmente redirect specifici per i medici: aggiungerli richiede una modifica esplicita alla configurazione di deploy.

### Rimuovere un medico

Rimuovere sia il record JSON sia la relativa immagine. `npm run check:data` fallisce se trova immagini non referenziate o mancanti. Valutare anche un redirect per la pagina eliminata.

## Specializzazioni

Il filtro deriva direttamente da `specialization`. I valori ammessi sono definiti una volta in `SPECIALIZATIONS`; per introdurre una disciplina, aggiungerla prima al catalogo TypeScript e poi usarla nel JSON.

Quando si introduce una disciplina, aggiornare gli eventuali testi SEO che elencano le specializzazioni e adeguare gli smoke test se la categoria è importante per il percorso utente.

## FAQ

Le domande e risposte sono in `src/data/faqs.ts`. Lo stesso array alimenta il componente visibile e lo schema JSON-LD `FAQPage`, mantenendoli coerenti. Le risposte devono essere testo semplice; riutilizzare `SITE` per telefono, email o altri dati centralizzati.

## Immagini e asset generali

- Inserire in `src/images/` le immagini importate dai componenti, così Astro può ottimizzarle.
- Inserire in `public/` solo file che devono conservare nome e percorso esatti, come favicon, manifest e fotografie referenziate dal JSON.
- Fornire sempre testo alternativo significativo nel componente che usa l'immagine.

## Checklist editoriale

1. Controllare ortografia, titoli professionali, URL e consenso alla pubblicazione.
2. Eseguire `npm run check:data`.
3. Eseguire `npm run check`.
4. Verificare le pagine interessate su desktop e mobile.
5. Per nuovi URL, controllare canonical, sitemap e necessità di redirect.
