import Card from "./Card";
import specializationsData from "../db/data.json";
import { useState } from "react";
import useMediaQuery from "@/lib/useMediaQuery";

type RenderCardsListProps = {
  isMainPage?: boolean;
};

const RenderCardsList = ({ isMainPage = true }: RenderCardsListProps) => {
  const [specializationFilter, setSpecializationFilter] = useState<
    string | null
  >(null);

  const handleSpecializationChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSpecializationFilter(e.target.value);
  };

  const classname = isMainPage
    ? ""
    : "grid grid-cols-1 gap-8 mx-auto px-6 md:px-20";

  const showThreeSpecializations = useMediaQuery("(min-width: 1530px)");

  const showedSpecializations =
    isMainPage && !showThreeSpecializations
      ? 2 :
      3

  return (
    <div className={classname}>
      {!isMainPage && (
        <div className="flex justify-center sm:justify-start mb-6">
          <label
            htmlFor="specialization-select"
            className="sr-only text-white"
            aria-describedby="specialization-select"
          >
            Seleziona una specializzazione
          </label>
          <select
            id="specialization-select"
            onChange={handleSpecializationChange}
            className="px-4 py-2 border rounded-md text-black font-serif"
          >
            <option value="">Mostra tutte le specializzazioni</option>
            {Array.from(
              new Set(specializationsData.map((s) => s.specialization))
            ).map((specialization, idx) => (
              <option key={idx} value={specialization}>
                {specialization}
              </option>
            ))}
          </select>
        </div>
      )}
      <div
        className={`grid grid-cols-1 lg:grid-cols-2 ${
          isMainPage ? "2xl:grid-cols-3" : "2xl:grid-cols-3"
        } gap-8`}
      >
        {specializationsData
          .filter((_, index) => (isMainPage ? index < showedSpecializations : specializationsData))
          .filter((specialization) =>
            specializationFilter
              ? specialization.specialization === specializationFilter
              : specialization
          )
          .map((specialization, idx) => (
            <Card
              key={idx}
              image={specialization.image}
              bio={specialization.bio}
              name={specialization.name}
              services={specialization.services}
              surname={specialization.surname}
              specialization={specialization.specialization}
              link={specialization.link}
            />
          ))}
      </div>
    </div>
  );
};

export default RenderCardsList;
