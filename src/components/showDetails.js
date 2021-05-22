import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { callAPI } from "../shared/service";
import Loader from "./../assets/loader.svg";
import { getURLParams } from "./../shared/utils";
import ShowOverview from "./showOverview";
import ShowRecommendations from "./showRecommendations";
export default function ShowDetails() {
  const location = useLocation();
  const [overview, setOverview] = useState(null);
  const [videos, setVideos] = useState(null);
  const [recommendations, setRecommendations] = useState(null);
  const imgPath = "https://image.tmdb.org/t/p";
  const { type: mediaType } = getURLParams(location.pathname);

  const getMovie = async (id) => {
    const response = await callAPI(
      `${process.env.REACT_APP_API_URL}/${mediaType}/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );
    setOverview(response);
  };
  const getVideos = async (id) => {
    const response = await callAPI(
      `${process.env.REACT_APP_API_URL}/${mediaType}/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );
    setVideos(response);
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
    getVideos(id);
    getRecommendations(id);
  }, [location.pathname]);
  return (
    <div className="show-details">
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
          <ShowOverview show={overview} videos={videos} />
          <ShowRecommendations shows={recommendations?.results} />
        </div>
      )}
    </div>
  );
}
