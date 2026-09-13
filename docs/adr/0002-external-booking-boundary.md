# ADR 0002: prenotazione come confine esterno

- Stato: accettato
- Data: 2026-09-13

## Contesto

Il sito non gestisce calendari o appuntamenti. Un link vuoto era usato come
segnale implicito per mostrare il contatto telefonico, mentre gli altri valori
rimandavano a Doctolib.

## Decisione

La disponibilità usa una union discriminata con due casi: `external`, che
richiede un URL HTTPS valido, e `phone`, che mostra il fallback telefonico. Doctolib
rimane il sistema di prenotazione e il sito non introduce logica locale per
disponibilità o sovrapposizioni.

## Alternative considerate

- Conservare stringa o `null` avrebbe mantenuto implicito il significato del
  valore assente.
- Integrare un calendario locale avrebbe aggiunto dati sanitari, concorrenza e
  requisiti operativi estranei a un sito statico.

## Conseguenze

I componenti gestiscono casi esaustivi e lo schema impedisce configurazioni
ambigue. Un futuro metodo di prenotazione richiederà una nuova variante e una
decisione esplicita sui suoi vincoli.
