import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { callAPI } from "./../shared/service";
import Loader from "./../assets/loader.svg";

export default function MovieExpanded() {
  const history = useHistory();
  const [detail, setDetail] = useState("");
  const [showId, setShowId] = useState(
    history.location.pathname.split("show/")[1]
  );
  const imgPath = "https://image.tmdb.org/t/p/w200";

  useEffect(() => {
    const getMovie = async () => {
      const response = await callAPI(
        `${process.env.REACT_APP_API_URL}/movie/${showId}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
      );
      console.log(response);
      setDetail(response);
    };
    getMovie();
  }, [showId]);
  return (
    <div>
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
      {/* <div className="text-center">
        <img
          src={Loader}
          alt="loading"
          style={{ height: "4rem", width: "4rem" }}
        />
      </div> */}
      <div className="show-poster">
        <img
          src={
            detail.backdrop_path ? imgPath + detail.backdrop_path : "NotFound"
          }
          style={{ width: "100%" }}
        />
      </div>
      <pre className="text-white">
        <code>{JSON.stringify(detail, 0, 2)}</code>
      </pre>
      expanded version goes here
    </div>
  );
}
