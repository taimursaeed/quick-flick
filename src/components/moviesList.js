import { useState } from "react";
import MovieCard from "./movieCard";
import MovieExpanded from "./movieExpanded";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export default function MoviesList({ searchTerm, fetchCompleted, ...props }) {
  const moviesMeta = props.movies;
  const movies = props.movies.results;
  let movieView, helperText;
  const [selectedMovie, setSelectedMovie] = useState(null);

  const handleClick = (e) => {
    // console.log(e);
    setSelectedMovie(e);
  };
  if (searchTerm.length > 0) {
    if (movies?.length > 0) {
      movieView = movies.map((movie, index) => (
        <MovieCard key={index} {...movie} onClick={handleClick} />
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
          <MovieExpanded />
        </Route>
        <Route path="/">
          <div className="movies-wrap">
            <div className="d-flex flex-grow-1 text-center flex-column">
              <div className="cards-wrap">{movieView}</div>
              {helperText}
            </div>
          </div>
        </Route>
      </Switch>
    </Router>
  );
}
