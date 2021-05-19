import Logo from "./../assets/logo.svg";
import SearchBar from "./searchBar";
export default function Header(props) {
  return (
    <>
      <div className="logo my-4 text-center ">
        <img src={Logo} alt="Logo" />
        <h1>Movies Search</h1>
      </div>
      <SearchBar {...props} />
    </>
  );
}
