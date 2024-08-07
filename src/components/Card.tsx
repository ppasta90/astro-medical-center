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
}: CardProps) => {
  const [section, setSection] = React.useState<"prestazioni" | "esperienze">(
    "prestazioni"
  );

  const activeTab =
    "w-3/6 text-secondary font-bold px-6 rounded-tl-lg text-left w-1/2 text-lg font-bold bg-white py-4 rounded-t-xl";
  const inactiveTab =
    "sm:w-full text-secondary px-6 h-12 text-left w-1/2 text-lg bg-lightGrey";

  const invisibleTab =
    "hidden md:block sm:w-full text-secondary px-6 h-12 text-left w-1/2 text-lg bg-lightGrey" +
    inactiveTab;

  const renderServices = (services: string[]) => {
    return (
      <ul className="list-disc ml-4 text-darkBlue">
        {services.map((service, index) => (
          <li key={index}>{capitalizeFirstLetter(service)}</li>
        ))}
      </ul>
    );
  };

  const renderBio = (bio: string) => {
    return <div className="mt-2 text-darkBlue max-h-[500px] overflow-auto">{bio}</div>;
  };

  return (
    <div className="flex flex-col smm:p-4 sm:p-8 rounded-2xl w-full bg-secondaryLight h-[610px]">
      <div
        id="card-header"
        className="flex flex-col justify-center text-center text-darkBlue"
      >
        <img
          src={image}
          className="rounded-full h-24 w-24 mx-auto object-contain"
          alt=""
        />
        <h2 className="text-2xl mt-4 font-bold">{specialization}</h2>
        <h3 className="text-xl mt-2">
          {name} {surname}
        </h3>
        <div className="mt-4">
          <button className="blue-cta">CHIAMA ORA</button>
        </div>
      </div>

      <div className="flex flex-col h-3/5">
        <div id="card-tabs" className="inline-flex w-full mt-8 items-end">
          <button
            className={section === "prestazioni" ? activeTab : inactiveTab}
            onClick={() => setSection("prestazioni")}
          >
            Prestazioni
          </button>

          <button
            className={`${section === "esperienze" ? activeTab : inactiveTab} ${
              section === "prestazioni" && "rounded-tl-none"
            } ${section === "esperienze" && "text-center"}`}
            onClick={() => setSection("esperienze")}
          >
            Esperienze
          </button>
          <div className={invisibleTab}></div>
        </div>

        <div className="flex flex-col bg-white px-4 pb-4 flex-grow">
          {section === "prestazioni" && (
            <div className="flex flex-col justify-between items-start p-4 rounded-lg h-[210px] overflow-auto">
              <ul className="list-disc ml-4 text-darkBlue pb-5">
                {services
                  .filter((_, index) => index < 5)
                  .map((service, index) => (
                    <li key={index}>{capitalizeFirstLetter(service)}</li>
                  ))}
              </ul>
              {services.length > 5 && (
                <CustomDialog
                  title={name + " " + surname + " - Prestazioni"}
                  description={renderServices(services)}
                  triggerComponent={
                    <span className="cursor-pointer text-secondary font-bold hover:underline inline-flex items-center gap-1">
                      <LuPlusCircle size={24} />
                      Mostra tutte le prestazioni
                    </span>
                  }
                />
              )}
            </div>
          )}
          {section === "esperienze" && (
            <div className="flex flex-col justify-between items-start p-4 rounded-lg h-[210px] overflow-auto">
              <div className="mt-2 text-darkBlue line-clamp-5">{bio}</div>
              <CustomDialog
                title={name + " " + surname + " - Esperienze"}
                description={renderBio(bio)}
                triggerComponent={
                  <span className="cursor-pointer text-secondary font-bold hover:underline inline-flex items-center gap-1 ml-2">
                    <LuPlusCircle size={24} />
                    Mostra di più
                  </span>
                }
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
