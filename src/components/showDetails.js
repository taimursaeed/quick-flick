import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { callAPI } from "../shared/service";
import Loader from "./../assets/loader.svg";
import ShowRecommendations from "./showRecommendations";

export default function ShowDetails() {
  const history = useHistory();
  const [detail, setDetail] = useState(null);
  const [recommendations, setRecommendations] = useState(null);
  const [showId, setShowId] = useState(
    history.location.pathname.split("show/")[1]
  );
  const imgPath = "https://image.tmdb.org/t/p";

  useEffect(() => {
    console.log(showId);

    const getMovie = async () => {
      const response = await callAPI(
        `${process.env.REACT_APP_API_URL}/movie/${showId}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
      );
      setDetail(response);
    };
    // const getImages = async () => {
    //   const response = await callAPI(
    //     `${process.env.REACT_APP_API_URL}/movie/${showId}/images?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    //   );
    //   console.log(response);
    // };
    const getSimilar = async () => {
      const response = await callAPI(
        `${process.env.REACT_APP_API_URL}/movie/${showId}/recommendations?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
      );
      setRecommendations(response);
    };
    getMovie();
    getSimilar();
    // getImages();
  }, [showId]);
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
              fill-rule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </Link>
      </header>
      {!detail ? (
        <div className="text-center">
          <img src={Loader} alt="loading" className="loader" />
        </div>
      ) : (
        <div className="container-xs">
          <div className="backdrop-poster">
            <img
              src={
                detail.backdrop_path
                  ? `${imgPath}/w200${detail.backdrop_path}`
                  : "NotFound"
              }
              className="backdrop-poster"
            />
          </div>
          <div className="detail">
            <div className="poster">
              <img
                src={
                  detail.poster_path
                    ? `${imgPath}/w400${detail.poster_path}`
                    : "NotFound"
                }
              />
              <button className="btn btn-dark btn-block mt-3">
                Watch Trailer
              </button>
            </div>
            <div>
              <h1>
                <a
                  href={detail.homepage ? detail.homepage : "#"}
                  target={detail.homepage ? " _blank" : "_parent"}
                  className="title"
                >
                  {detail.title}
                  {detail.homepage ? (
                    <svg
                      className="ml-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"></path>
                      <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"></path>
                    </svg>
                  ) : (
                    ""
                  )}
                </a>
              </h1>
              <p>Release: {detail.release_date}</p>
              <p>Run time: {detail.runtime} m</p>
              <p>
                Genres:
                {detail?.genres.map((item) => (
                  <span className="ml-2 badge badge-light">{item.name}</span>
                ))}
              </p>
              <p className="overview">{detail.overview}</p>
            </div>
          </div>
          {recommendations ? (
            <>
              <h2 className="h4 mt-5">You might also like:</h2>
              <ShowRecommendations shows={recommendations.results} />
            </>
          ) : (
            ""
          )}
          {/* <pre className="text-white">
            <code>{JSON.stringify(detail, 0, 2)}</code>
          </pre> */}
        </div>
      )}
    </div>
  );
}
