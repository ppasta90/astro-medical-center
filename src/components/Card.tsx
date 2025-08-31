import React from "react";
import { LuPlusCircle } from "react-icons/lu";
import CustomDialog from "./ui/CustomDialog";
import { capitalizeFirstLetter, generateDoctorSlug } from "@/lib/utils";

type CardProps = {
  name: string;
  surname: string;
  bio: string;
  image: string;
  specialization: string;
  services: string[];
  link?: string;
};
const Card = ({
  name,
  surname,
  bio,
  image,
  specialization,
  services,
  link,
}: CardProps) => {
  return (
    <div className="flex flex-col smm:p-4 sm:p-8 rounded-2xl w-full bg-secondaryLight h-[610px]">
      <div
        id="card-header"
        className="flex flex-col justify-center text-center text-darkBlue"
      >
        <img
          src={image}
          className="rounded-full mx-auto aspect-square object-contain"
          alt={`foto del medico specialista ${name} ${surname}`}
          width={96}
          height={96}
          loading="lazy"
        />
        <h2 className="text-2xl mt-4 font-bold">{name} {surname}</h2>
        <h3 className="text-xl mt-2">
        {specialization}
        </h3>
        <div className="mt-4">
          <a href="tel:0574027087" className="blue-cta ">
            CHIAMA ORA
          </a>
          {link && (
            <a
              href={link}
              target="_blank"
              rel="noreferrer"
              className="white-cta ml-2"
            >
              PRENOTA ONLINE
            </a>
          )}
        </div>
      </div>

      <div className="flex flex-col h-3/5">
        <div id="card-tabs" className="inline-flex w-full mt-8 items-end">
          <div
            className="w-3/6 text-secondary font-bold px-6 rounded-tl-lg text-left w-1/2 text-lg font-bold bg-white py-4 rounded-t-xl"
          >
            Esperienze
          </div>
          <div className="hidden md:block sm:w-full text-secondary px-6 h-12 text-left w-1/2 text-lg bg-lightGrey"></div>
        </div>

        <div className="flex flex-col bg-white px-4 pb-4 flex-grow">
          <div className="flex flex-col justify-between items-start p-4 rounded-lg h-[210px] overflow-auto no-scrollbar">
            <div className="mt-2 text-darkBlue line-clamp-5">{bio}</div>
            <div className="flex gap-4 items-center">
              <CustomDialog
                title={name + " " + surname + " - Esperienze"}
                description={
                  <div className="text-left mt-2 text-darkBlue max-h-[500px] overflow-auto text-base no-scrollbar">
                    {bio}
                  </div>
                }
                triggerComponent={
                  <span className="cursor-pointer text-secondary font-bold hover:underline inline-flex items-center gap-1 ml-1">
                    <LuPlusCircle size={24} />
                    Mostra di più
                  </span>
                }
              />
              <a
                href={`/${generateDoctorSlug(surname, specialization)}`}
                className="cursor-pointer text-secondary font-bold hover:underline inline-flex items-center gap-1"
              >
                Dettagli
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ServicesList = ({
  services,
  maxVisible = 5,
  showAll = false,
}: {
  services: string[];
  maxVisible?: number;
  showAll?: boolean;
}) => {
  // Limita la visualizzazione a 'maxVisible' se showAll è false
  const visibleServices = showAll ? services : services.slice(0, maxVisible);

  return (
    <ul className="list-disc ml-4 text-darkBlue text-left text-base">
      {visibleServices.map((service, index) => (
        <li key={index}>{capitalizeFirstLetter(service)}</li>
      ))}
    </ul>
  );
};

export default Card;
