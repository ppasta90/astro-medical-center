# Aggiornamento specialisti e contatti

## Intento

Rimuovere dal sito la dottoressa Ilaria Scandagli e ogni riferimento al numero
e al servizio di segreteria non più disponibili. La prenotazione deve partire
dalla sezione specialisti, dove ogni professionista mostra soltanto i propri
recapiti effettivamente disponibili.

## Obiettivi

- eliminare Scandagli dal catalogo, dalle route generate e dagli asset;
- rimuovere il telefono centrale da configurazione, interfaccia, FAQ e dati
  strutturati;
- sostituire i richiami alla segreteria con un invito chiaro a consultare gli
  specialisti;
- aggiungere a ogni medico telefono ed email facoltativi, mantenendo l'attuale
  campo `link` per Doctolib;
- mostrare soltanto pulsanti utilizzabili, senza placeholder o recapiti vuoti.

## Non obiettivi

- non introdurre un sistema di prenotazione interno;
- non modificare gli URL degli specialisti rimasti;
- non alterare orari, indirizzo, PEC o recapiti societari non telefonici;
- non modificare il foglio Google usato come fonte.

## Approcci considerati

1. **Scelto — estensione minima del modello attuale.** Conservare `link` come
   URL Doctolib e aggiungere `phone` ed `email` facoltativi. Riduce la migrazione
   e resta compatibile con l'architettura di `main`.
2. **Oggetto `contacts` annidato.** Più estensibile, ma richiederebbe una
   migrazione completa e riprenderebbe parte del refactor problematico escluso
   dal lavoro.
3. **Solo modifica testuale.** Non consentirebbe di pubblicare recapiti
   individuali e lascerebbe CTA telefoniche centrali non valide.

## Dati e regole di selezione

Il foglio Google indicato dall'utente è la fonte per email e telefoni. Per i
telefoni:

- viene usato il numero esplicitamente indicato per i pazienti;
- viene escluso quello marcato come privato o non destinato ai pazienti;
- se è presente un solo numero senza restrizioni viene usato quello;
- per Carlotta Coppini viene usato il numero di lavoro `350 8266621`, come
  indicato dall'utente;
- se il professionista non compare nel foglio o non ha un recapito valido, il
  campo viene omesso.

Quando il foglio contiene più email, viene usata la prima email elencata come
recapito principale. Gli indirizzi vengono normalizzati senza spazi o righe
vuote.

## Interfaccia e contenuti

- Le card e le pagine dei medici mostrano, in ordine, telefono, email e
  Doctolib quando presenti.
- Hero e header indirizzano a `/specializzazioni` invece di proporre la chiamata
  al centro.
- La sezione Contatti spiega che, per prenotare, occorre aprire la sezione
  specialisti e usare i recapiti pubblicati nella scheda del professionista.
- La fotografia e il testo alternativo della segreteria vengono sostituiti con
  un'immagine neutra del centro.
- Footer, FAQ e pagina “Lavora con noi” non mostrano più il numero dismesso.
- I dati strutturati non dichiarano più il telefono centrale.

Testo proposto per la sezione Contatti:

> Per prenotare una visita, consulta la sezione Specialisti e scegli il
> professionista di tuo interesse. Nella sua scheda troverai, quando
> disponibili, il numero di telefono, l'indirizzo email o il link diretto a
> Doctolib da utilizzare per la prenotazione.

## Verifica

- validazione del catalogo e assenza di asset orfani;
- build senza la route di Scandagli;
- test del rendering condizionale di telefono, email e Doctolib;
- ricerca globale per assicurare l'assenza del vecchio numero e dei richiami
  alla segreteria;
- suite `npm test` completa.
