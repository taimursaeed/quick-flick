import Logo from "./../assets/logo.svg";
import { Link } from "react-router-dom";
import SearchBar from "./searchBar";
export default function Header(props) {
  return (
    <div className="container">
      <header>
        <div className="logo my-4 text-center ">
          {/* <img src={Logo} alt="Logo" /> */}
          <Link to="/">
            <h1>Movies Search</h1>
          </Link>
        </div>
        <SearchBar {...props} />
      </header>
    </div>
  );
}
