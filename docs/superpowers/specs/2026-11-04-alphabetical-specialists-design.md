# Ordinamento alfabetico degli specialisti

## Intento

Mostrare gli specialisti in ordine alfabetico per cognome, con il nome come criterio di spareggio, così che l'elenco sia prevedibile per chi cerca un professionista.

## Ambito

- Ordinare centralmente i risultati di `getDoctors()` tramite confronto locale italiano sul cognome e poi sul nome.
- Rimuovere il campo numerico `order` dal modello e da tutti i record, evitando due fonti di verità.
- Verificare con un test browser l'ordine completo visibile nella pagina Specialisti.
- Conservare invariati slug, contatti, specializzazioni, route e contenuti dei professionisti.

## Approcci considerati

1. **Ordinamento centralizzato per cognome** — scelto. Mantiene automaticamente l'ordine anche per i nuovi specialisti ed elimina il campo `order` ormai inutile.
2. **Riordino manuale di `data.json` e dei valori `order`** — scartato perché fragile e soggetto a divergenze durante i futuri inserimenti.

## Comportamento atteso

`getDoctors()` restituisce sempre i professionisti ordinati con `surname.localeCompare(..., "it")`; in caso di cognome uguale usa `name.localeCompare(..., "it")`. La pagina `/specializzazioni` riflette lo stesso ordine.

## Verifica

- Il test browser deve osservare i cognomi nell'ordine alfabetico atteso.
- `npm test` deve continuare a superare validazione dati, build, link, accessibilità e test browser.
