import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import ShowCard from "./showCard";

export default function ShowRecommendations({ shows }) {
  return (
    <div className="cards-wrap recommendations">
      {shows.slice(0, 3).map((show, index) => (
        <ShowCard key={index} {...show} />
      ))}
    </div>
  );
}
