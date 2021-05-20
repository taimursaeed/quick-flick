import NotFound from "./../assets/not-found.png";

export default function MovieCard(props) {
  const imgPath = "https://image.tmdb.org/t/p/w400";

  return (
    <a className="card" href="#" onClick={props.onClick} id={props.id}>
      <img
        className="card-img-top"
        src={props.poster_path ? imgPath + props.poster_path : NotFound}
        alt={props.title}
      />
      <div className="card-body">
        <h5 className="card-title">{props.title || props.name}</h5>
        <p className="card-text">
          <small className="release">
            {props.release_date || props.first_air_date}
          </small>
        </p>
      </div>
    </a>
  );
}
