import ShowCard from "./showCard";
export default function ShowRecommendations(props) {
  return (
    <>
      {props.shows ? (
        <>
          <h2 className="h4 mt-5">You might also like:</h2>
          <div className="cards-wrap recommendations">
            {props.shows.slice(0, 3).map((show, index) => (
              <ShowCard key={index} {...show} />
            ))}
          </div>
        </>
      ) : null}
    </>
  );
}
