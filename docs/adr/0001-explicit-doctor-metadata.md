# ADR 0001: metadati professionali espliciti

- Stato: accettato
- Data: 2026-09-13

## Contesto

Il sito ricavava slug e titoli professionali combinando nome, genere presunto e
specializzazione. La stessa euristica era presente in più componenti, non
copriva tutti i nomi e rendeva un cambio editoriale capace di modificare un URL
pubblico.

## Decisione

Ogni medico dichiara esplicitamente `slug`, `honorific` e `professionTitle`. La
specializzazione appartiene a un catalogo chiuso condiviso con lo schema Zod.
Il genere non fa parte del modello e non viene inferito.

## Alternative considerate

- Centralizzare l'euristica esistente avrebbe eliminato la duplicazione, ma non
  la sua fallibilità.
- Generare lo slug dal titolo avrebbe ridotto i campi editoriali, ma avrebbe
  legato URL e SEO a modifiche testuali.

## Conseguenze

I contenuti richiedono qualche campo esplicito in più, ma URL e testi diventano
stabili, revisionabili e validabili durante la build. Nuove specializzazioni
richiedono un aggiornamento deliberato del catalogo TypeScript.
