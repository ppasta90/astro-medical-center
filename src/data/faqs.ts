import { SITE } from "@/config/site";

export const FAQS = [
  {
    question: "Come posso prenotare una visita?",
    answer: `Puoi prenotare una visita scrivendo a ${SITE.contact.email} oppure visitando la nostra pagina Doctolib.`,
  },
  {
    question: "Come posso pagare una visita?",
    answer:
      "I pagamenti possono essere effettuati in contanti, con carta di credito o bancomat.",
  },
  {
    question: "Quali sono gli orari di apertura?",
    answer:
      "Siamo aperti tutti i pomeriggi, da lunedì a venerdì, dalle 15:00 alle 19:00.",
  },
  {
    question: "Posso prenotare una visita per conto di un'altra persona?",
    answer:
      "Sì, puoi prenotare una visita per conto di un'altra persona, ma ricorda di portare con te il suo codice fiscale.",
  },
  {
    question: "Posso annullare una visita già prenotata?",
    answer:
      "Sì, puoi annullare una visita già prenotata, ma ti chiediamo di farlo almeno 24 ore prima dell'appuntamento.",
  },
  {
    question: "Posso richiedere una visita a domicilio?",
    answer:
      "No, i nostri specialisti effettuano visite solo presso il nostro studio.",
  },
  {
    question: "Quali sono i costi delle visite?",
    answer:
      "I costi delle visite variano in base alla specializzazione del medico e alla tipologia di visita.",
  },
  {
    question: "Posso richiedere una visita urgente?",
    answer:
      "No, per urgenze consigliamo di recarsi al pronto soccorso più vicino.",
  },
  {
    question: "Accettate le assicurazioni?",
    answer: "No, al momento non accettiamo pagamenti tramite assicurazioni.",
  },
  {
    question:
      "È possibile effettuare esami di laboratorio presso il vostro centro?",
    answer: "No, non effettuiamo esami di laboratorio.",
  },
  {
    question: "Ci sono parcheggi disponibili?",
    answer: "Sì, disponiamo di un ampio parcheggio di fronte al nostro studio.",
  },
  {
    question: "Cosa succede se arrivo in ritardo all'appuntamento?",
    answer:
      "Se arrivi in ritardo all'appuntamento, ti chiediamo di avvisarci il prima possibile, così da organizzarci al meglio.",
  },
  {
    question: "Come posso contattarvi per ulteriori informazioni?",
    answer: `Puoi contattarci scrivendo a ${SITE.contact.email} o chiamando il numero ${SITE.contact.phone.display} dal lunedì al venerdì, dalle 15:00 alle 19:00.`,
  },
] as const;
