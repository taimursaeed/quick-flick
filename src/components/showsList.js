import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ShowCard from "./showCard";
import ShowDetails from "./showDetails";

export default function ShowsList({ searchTerm, fetchCompleted, ...props }) {
  const moviesMeta = props.movies;
  const movies = props.movies.results;
  let movieView, helperText;

  if (searchTerm.length > 0) {
    if (movies?.length > 0) {
      movieView = movies.map((movie, index) => (
        <ShowCard key={index} {...movie} />
      ));
    }
    if (fetchCompleted) {
      helperText =
        moviesMeta.total_pages > 0 &&
        moviesMeta.page <= moviesMeta.total_pages ? (
          <p className="text-center mt-3 mb-4">End of results</p>
        ) : (
          <p className="text-center mt-3 mb-4" style={{ flex: 1 }}>
            No result found
          </p>
        );
    }
  }
  return (
    <Router>
      <Switch>
        <Route path="/show/:id">
          <ShowDetails />
        </Route>
        <Route path="/">
          <div className="d-flex flex-grow-1 text-center flex-column">
            <div className="cards-wrap">{movieView}</div>
            {helperText}
          </div>
        </Route>
      </Switch>
    </Router>
  );
}
