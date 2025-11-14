# Google Ads Conversion Tracking - Evento "Contatto"

## Implementazione completata

Sono stati aggiunti gli eventi di conversione Google Ads a tutti i punti in cui l'utente può effettuare una chiamata cliccando su un pulsante.

### ID Conversione
- **Conversion ID**: `AW-16456523599`
- **Conversion Label**: `hG7fCL_g-L8bEM--iqc9`

### Punti di tracking implementati

#### 1. **Layout principale** (`src/layouts/Layout.astro`)
- Aggiunto script `gtag_report_conversion()` nel `<head>`
- Questo script è disponibile globalmente su tutte le pagine

#### 2. **Hero section** (`src/components/Hero.astro`)
- ✅ Pulsante "CHIAMA ORA!" nella sezione hero
  - URL: `tel:0574027087`
  - Evento inviato al click

#### 3. **Header desktop** (`src/components/Header.tsx`)
- ✅ Pulsante "CHIAMA ORA" nel menu desktop (hidden su tablet)
  - URL: `tel:0574027087`
  - Implementato con `onClick` handler React

#### 4. **Sezione Contatti** (`src/components/Contacts.astro`)
- ✅ Link telefonico con icona
  - URL: `tel:0574027087`
  - Evento tracciato al click

#### 5. **Pagina Profilo Medico** (`src/pages/[slug].astro`)
- ✅ Pulsante "CHIAMA ORA" (mobile only)
  - URL: `tel:+390574718506`
  - Evento tracciato al click

#### 6. **Menu Mobile** (`src/components/DrawerContent.tsx`)
- ✅ Link "CHIAMA" nel drawer menu
  - URL: `tel:0574027087`
  - Evento tracciato + chiusura drawer

#### 7. **Componente DoctorProfile** (`src/components/DoctorProfile.astro`)
- ✅ Pulsante "📞 CHIAMA ORA: 0574 027 087"
  - URL: `tel:0574027087`
  - Evento tracciato al click
  - (Componente non attualmente utilizzato, ma aggiornato per completezza)

## Come funziona il tracking

Quando un utente clicca su uno dei pulsanti telefono:

1. Viene triggerato l'evento di conversione Google Ads
2. L'evento viene inviato con:
   - `'send_to': 'AW-16456523599/hG7fCL_g-L8bEM--iqc9'`
   - `'event_callback'`: callback che esegue l'azione effettiva (tel: link)

3. Google Ads traccia la conversione
4. Dopo il tracciamento, la navigazione procede normalmente

## Numeri di telefono tracciati

- **Numero principale**: `0574027087` (Centro Medico Agliana)
- **Numero alternativo**: `+390574718506` (Nelle pagine dei medici)

## Verifica del tracking

Per verificare che il tracking funzioni:

1. Apri Chrome DevTools (F12)
2. Vai alla scheda "Network"
3. Filtra per "conversion" o "google"
4. Clicca su uno dei pulsanti telefonici
5. Dovresti vedere una richiesta a `googleads.g.doubleclick.net` con l'evento di conversione

Oppure in Google Ads:
1. Vai a "Strumenti" → "Conversioni"
2. Seleziona la conversione "Contatto"
3. Controlla il numero di conversioni registrate

## Note importanti

- Lo script di conversione è agnostico al tipo di browser/device
- Funziona sia su desktop che mobile
- I numeri tel: sono standard HTML e funzionano su tutti i device
- L'evento viene inviato indipendentemente se l'utente ha un'app telefonica o meno
