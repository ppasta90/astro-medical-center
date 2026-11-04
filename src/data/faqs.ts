import { SITE } from "@/config/site";

export const FAQS = [
  {
    question: "Come posso prenotare una visita?",
    answer:
      "Consulta la sezione Specialisti, scegli il professionista e utilizza il numero di telefono o il link Doctolib disponibile nella sua scheda.",
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
    question: "Posso richiedere una visita a domicilio?",
    answer:
      "No, i nostri specialisti effettuano visite solo presso il nostro studio.",
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
      "Se arrivi in ritardo all'appuntamento, ti chiediamo di avvisare il medico il prima possibile.",
  },
  {
    question: "Come posso contattarvi per ulteriori informazioni?",
    answer: `Per informazioni generali puoi scriverci a ${SITE.contact.email}. Per prenotare, utilizza i recapiti presenti nella scheda dello specialista.`,
  },
] as const;
