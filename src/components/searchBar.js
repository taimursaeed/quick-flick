import { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import Loader from "./../assets/loader.svg";
export default function SearchBar(props) {
  let history = useHistory();
  let location = useLocation();
  const pathName = history.location.pathname;
  const searchPage = pathName === "/";
  useEffect(() => {
    console.log(history.location.pathname);
  }, [location]);

  return (
    <div className="search mb-4">
      {!searchPage && (
        <button
          className="btn p-0"
          onClick={() => {
            history.goBack();
          }}
        >
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
        </button>
      )}
      <input
        className={"form-control " + (!searchPage ? "has-back" : "")}
        type="text"
        placeholder="Search movies, tv series and episodes...."
        onChange={props.onChange}
        value={props.searchTerm}
      ></input>
      {props.isFetching ? <img src={Loader} alt="loading" /> : ""}
    </div>
  );
}
