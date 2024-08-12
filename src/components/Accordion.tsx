import {
  Accordion as CustomAccordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface AccordionProps {
  data: {
    question: string;
    answer: string;
  }[];
}

const Accordion = ({ data }: AccordionProps) => {
  return (
    <CustomAccordion
      type="multiple"
      className="w-full font-sans"
      defaultValue={["item-0"]}
    >
      {data.map((item, i) => {
        return (
          <AccordionItem key={i} value={`item-${i.toFixed()}`}>
            <AccordionTrigger className="text-left text-white data-[state=open]:text-primary font-bold text-lg">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="text-left text-white font-normal text-lg">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </CustomAccordion>
  );
};

export default Accordion;
