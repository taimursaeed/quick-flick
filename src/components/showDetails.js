import { useEffect, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { callAPI } from "../shared/service";
import Loader from "./../assets/loader.svg";
import ShowOverview from "./showOverview";
import ShowRecommendations from "./showRecommendations";
import { getURLParams } from "./../shared/utils";
export default function ShowDetails() {
  const location = useLocation();
  const [overview, setOverview] = useState(null);
  const [recommendations, setRecommendations] = useState(null);
  const imgPath = "https://image.tmdb.org/t/p";
  const { type: mediaType } = getURLParams(location.pathname);

  const getMovie = async (id) => {
    const response = await callAPI(
      `${process.env.REACT_APP_API_URL}/${mediaType}/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );
    setOverview(response);
  };

  const getRecommendations = async (id) => {
    const response = await callAPI(
      `${process.env.REACT_APP_API_URL}/${mediaType}/${id}/recommendations?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );
    setRecommendations(response);
  };

  useEffect(() => {
    const { id } = getURLParams(location.pathname);
    setOverview(null);
    setRecommendations(null);
    getMovie(id);
    getRecommendations(id);
  }, [location.pathname]);
  return (
    <div className="show-details">
      <header>
        <Link to="/">
          <svg
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            className="btn-back"
          >
            <path
              fillRule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
        </Link>
      </header>
      {!overview ? (
        <div className="text-center">
          <img src={Loader} alt="loading" className="loader" />
        </div>
      ) : (
        <div className="container-xs">
          <div className="backdrop-poster">
            <img
              src={
                overview.backdrop_path
                  ? `${imgPath}/w200${overview.backdrop_path}`
                  : "NotFound"
              }
              className="backdrop-poster"
            />
          </div>
          <ShowOverview show={overview} />
          <ShowRecommendations shows={recommendations?.results} />
        </div>
      )}
    </div>
  );
}
