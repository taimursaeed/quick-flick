import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import MovieCard from "./movieCard";

export default function ShowRecommendations({ movies }) {
  return (
    <div className="cards-wrap recommendations">
      {movies.slice(0, 3).map((movie, index) => (
        <MovieCard key={index} {...movie} />
      ))}
    </div>
  );
}
