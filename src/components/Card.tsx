import React from "react";
import { LuPlusCircle } from "react-icons/lu";
import CustomDialog from "./ui/CustomDialog";

const Card = () => {
  const [section, setSection] = React.useState<"prestazioni" | "esperienze">(
    "prestazioni"
  );

  const activeTab =
    "text-secondary font-bold px-6 rounded-tl-lg h-12 text-left w-1/2 text-lg font-bold bg-white";
  const inactiveTab =
    "text-secondary px-6 h-12 text-left w-1/2 text-lg bg-lightGrey rounded-tr-lg";

  return (
    <div className="py-16 px-8 rounded-lg w-full max-w-xl bg-lightViolet">
      <img
        src="https://picsum.photos/200/300"
        className="rounded-full h-24 w-24 mx-auto"
        alt=""
      />
      <h2 className="text-center text-2xl mt-4 text-darkBlue font-bold">
        Podologa
      </h2>
      <h3 className="text-center text-xl mt-2 text-darkBlue">
        Dott.ssa Sandra Pellegrino
      </h3>
      <div className="flex justify-center mt-4">
        <button className="blue-cta">CHIAMA ORA</button>
      </div>
      <div className="inline-flex w-full mt-4 ">
        <button
          className={section === "prestazioni" ? activeTab : inactiveTab}
          onClick={() => setSection("prestazioni")}
        >
          Prestazioni e servizi
        </button>
        <button
          className={section === "esperienze" ? activeTab : inactiveTab}
          onClick={() => setSection("esperienze")}
        >
          Esperienze
        </button>
      </div>
      <div className="bg-white px-4 pb-4">
        {section === "prestazioni" && (
          <div className="p-4 rounded-lg">
            <ul className="list-disc ml-4 mt-2 text-darkBlue">
              <li>Visita podologica</li>
              <li>Esame baropodometrico</li>
              <li>Ortesi plantari con scansione 3D</li>
              <li>Fabbricazione ortesi plantari su misura in silicone</li>
              <li>
                Trattamenti podologici per problematiche di unghie incarnite,
                verruche, ipercheratosi, onicomicosi, distrofie ungueali...
              </li>
            </ul>
            <CustomDialog
              title="Titolo"
              description="blablablablablabla"
              triggerComponent={
                <button className="mt-3 text-secondary font-bold hover:underline inline-flex items-center gap-1">
                  <LuPlusCircle size={24} />
                  Mostra tutte le prestazioni
                </button>
              }
            />
          </div>
        )}
        {section === "esperienze" && (
          <div className="p-4 rounded-lg">
            <ul className="list-disc ml-4 mt-2 text-darkBlue">
              <li>Laurea in blalba</li>
              <li>Tirocinio di qua</li>
              <li>Esperienza de la</li>
            </ul>
            <CustomDialog
              title="Titolo"
              description="blablablablablabla"
              triggerComponent={
                <button className="mt-3 text-secondary font-bold hover:underline inline-flex items-center gap-1">
                  <LuPlusCircle size={24} />
                  Mostra tutte le esperienze
                </button>
              }
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
