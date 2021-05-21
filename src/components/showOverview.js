export default function ShowOverview({ show }) {
  const imgPath = "https://image.tmdb.org/t/p";
  return (
    <div className="detail">
      <div className="poster">
        <img
          src={
            show.poster_path ? `${imgPath}/w400${show.poster_path}` : "NotFound"
          }
        />
        <button className="btn btn-dark btn-block mt-3">Watch Trailer</button>
      </div>
      <div>
        <h1>
          <a
            href={show.homepage ? show.homepage : "#"}
            target={show.homepage ? " _blank" : "_parent"}
            className="title"
          >
            {show.original_title || show.original_name}
            {show.homepage ? (
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
        {(show.release_date || show.first_air_date) && (
          <p>Release: {show.release_date || show.first_air_date}</p>
        )}
        {show.runtime && <p>Run time: {show.runtime} m</p>}
        <p>
          {show.number_of_seasons && (
            <span>Seasons: {show.number_of_seasons} </span>
          )}
          {show.number_of_episodes && (
            <span className="ml-3">Episodes: {show.number_of_episodes} </span>
          )}
        </p>
        {show.genres && (
          <p>
            Genres:
            {show.genres.map((item, i) => (
              <span className="ml-2 badge badge-light" key={i}>
                {item.name}
              </span>
            ))}
          </p>
        )}
        <p className="overview">{show.overview}</p>
      </div>
    </div>
  );
}
