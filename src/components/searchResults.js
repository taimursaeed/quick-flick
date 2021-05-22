import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ShowCard from "./showCard";
import ShowDetails from "./showDetails";

export default function SearchResults({
  searchTerm,
  fetchCompleted,
  ...props
}) {
  const showsMeta = props.shows;
  const shows = props.shows.results;
  let showView, helperText;

  if (searchTerm.length > 0) {
    if (shows?.length > 0) {
      showView = shows.map((show, index) => <ShowCard key={index} {...show} />);
    }
    if (fetchCompleted) {
      helperText =
        showsMeta.total_pages > 0 && showsMeta.page <= showsMeta.total_pages ? (
          <p className="text-center mt-3 mb-4">End of results</p>
        ) : (
          <p className="text-center mt-3 mb-4" style={{ flex: 1 }}>
            No result found
          </p>
        );
    }
  }
  return (
    <div className="container-fluid">
      {props.hasError ? (
        <div className="mx-auto my-5 p-2 rounded-left rounded-right text-center w-25">
          <div className="mb-3 h1">(·_·)</div>
          <p className="mb-0">Uh oh, an error! Try again.</p>
        </div>
      ) : (
        <div className="d-flex flex-grow-1 text-center flex-column">
          <div className="cards-wrap">{showView}</div>
          {helperText}
        </div>
      )}
    </div>
  );
}
