import React from "react";
import { LuPlusCircle } from "react-icons/lu";
import CustomDialog from "./ui/CustomDialog";
import { capitalizeFirstLetter } from "@/lib/utils";

type CardProps = {
  name: string;
  surname: string;
  bio: string;
  image: string;
  specialization: string;
  services: string[];
  
};
const Card = ({
  name,
  surname,
  bio,
  image,
  specialization,
  services,
}: CardProps)  => {
  const [section, setSection] = React.useState<"prestazioni" | "esperienze">(
    "prestazioni"
  );

  const activeTab =
    "text-secondary font-bold px-6 rounded-tl-lg h-12 text-left w-1/2 text-lg font-bold bg-white";
  const inactiveTab =
    "text-secondary px-6 h-12 text-left w-1/2 text-lg bg-lightGrey rounded-tr-lg";

  return (
    <div className="p-8 rounded-2xl w-full bg-lightViolet">
      <img
        src="https://picsum.photos/200/300"
        className="rounded-full h-24 w-24 mx-auto"
        alt=""
      />
      <h2 className="text-center text-2xl mt-4 text-darkBlue font-bold">
        {specialization}
      </h2>
      <h3 className="text-center text-xl mt-2 text-darkBlue">
        {name} {surname}
      </h3>
      <div className="flex justify-center mt-4">
        <button className="blue-cta">CHIAMA ORA</button>
      </div>
      <div className="inline-flex w-full mt-8 pt-4 pr-4">
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
              {services.map((service, index) => (
                <li key={index}>{service}</li>
              ))}
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
              {bio}
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
