import NotFound from "./../assets/not-found.png";
import MovieCard from "./movieCard";

export default function MoviesList({ searchTerm, fetchCompleted, ...props }) {
  const moviesMeta = props.movies;
  const movies = props.movies.results;
  const imgPath = "https://image.tmdb.org/t/p/w400";
  let movieView, helperText;

  if (searchTerm.length > 0) {
    if (movies?.length > 0) {
      movieView = movies.map((movie) => (
        <MovieCard
          key={movie.id}
          title={movie.title}
          img={movie.poster_path ? imgPath + movie.poster_path : NotFound}
          release={movie.release_date}
        />
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
    <>
      <div className="cards-wrap">{movieView}</div>
      {helperText}
    </>
  );
}
