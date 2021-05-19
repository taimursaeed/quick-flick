export default function MovieCard(props) {
  return (
    <div className="card">
      <img className="card-img-top" src={props.img} alt={props.title} />
      <div className="card-body">
        <h5 className="card-title">{props.title}</h5>
        <p className="card-text">
          <small className="text-muted">Released: {props.release}</small>
        </p>
      </div>
    </div>
  );
}
