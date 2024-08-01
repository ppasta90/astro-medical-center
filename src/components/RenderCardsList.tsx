import Card from "./Card";
import specializationsData from "../db/data.json";
type RenderCardsListProps = {
  isMainPage?: boolean;
};
const RenderCardsList = ({ isMainPage = true }: RenderCardsListProps) => {
  return (
    <>
      {specializationsData
      .filter((_, index) => isMainPage ? index < 2 : specializationsData )
      .map((specialization, idx) => (
        <Card
          key={idx}
          image={specialization.image}
          bio={specialization.bio}
          name={specialization.name}
          services={specialization.services}
          surname={specialization.surname}
          specialization={specialization.specialization}
        />
      ))}
    </>
  );
};

export default RenderCardsList;
