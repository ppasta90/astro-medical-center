import Card from "./Card";
import specializationsData from "../db/data.json";
import { useState, useMemo, memo } from "react";
import useMediaQuery from "@/lib/useMediaQuery";

type RenderCardsListProps = {
  isMainPage?: boolean;
};

const RenderCardsList = memo(({ isMainPage = true }: RenderCardsListProps) => {
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

  const showedSpecializations = useMemo(() =>
    isMainPage && !showThreeSpecializations ? 2 : 3,
    [isMainPage, showThreeSpecializations]
  );

  return (
    <div className={classname}>
      {!isMainPage && (
        <div className="flex flex-col justify-center sm:justify-start mb-6 w-fit gap-2">
          <label
            id="specialization-label"
            htmlFor="specialization-select"
            className="text-white font-sans text-lg"
          >
            Filtra per specializzazione:
          </label>
          <select
            id="specialization-select"
            aria-labelledby="specialization-label"
            onChange={handleSpecializationChange}
            className="px-4 py-2 border rounded-md text-black font-serif text-lg"
          >
            <option value="">Mostra tutte le specializzazioni</option>
            {Array.from(
              new Set(specializationsData
                .sort((a, b) => a.specialization.localeCompare(b.specialization))
                .map((s) => s.specialization))
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
          .sort((a, b) => a.specialization.localeCompare(b.specialization))
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
});

export default RenderCardsList;
