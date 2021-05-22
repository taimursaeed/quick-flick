import Logo from "./../assets/logo.svg";
import { Link } from "react-router-dom";
import SearchBar from "./searchBar";
export default function Header(props) {
  return (
    <>
      <div className="logo my-4 text-center ">
        <img src={Logo} alt="Logo" />
        <Link to="/">
          <h1>Quick Flick</h1>
        </Link>
      </div>
      <h4 className="text-center mb-4">
        Explore millions of movies and tv shows.
      </h4>
      <SearchBar {...props} />
    </>
  );
}
