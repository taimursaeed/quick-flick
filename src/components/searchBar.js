import Loader from "./../assets/loader.svg";

export default function SearchBar(props) {
  return (
    <div className="search">
      <input
        className="form-control mb-4"
        type="text"
        placeholder="Search movies, tv series and episodes...."
        onChange={props.onChange}
        value={props.searchTerm}
      ></input>
      {props.isFetching ? <img src={Loader} alt="loading" /> : ""}
    </div>
  );
}
