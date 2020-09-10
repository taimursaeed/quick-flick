import React from "react";
import "./App.scss";
import "./MovieRow";
import MovieRow from "./MovieRow";
import NotFound from "./assets/not-found.png";
import Logo from "./assets/logo.svg";
import Loader from "./assets/loader.svg";

class App extends React.Component {
  constructor() {
    super();
    this.state = { movies: null, searchTerm: "", searching: false };
    this.aborter = null;
  }
  render() {
    return (
      <div className="App">
        <div className="container-sm">
          <div className="logo my-4 text-center ">
            <img src={Logo} alt="Logo" />
            <h1>Movies Database</h1>
          </div>
          <div className="search">
            <input
              className="form-control mb-4"
              type="text"
              placeholder="Search movies, series and episodes...."
              onChange={this.searchAPI}
              onFocus={this.onFocus}
              onBlur={this.onBlur}
              value={this.state.searchTerm}
            ></input>
            {this.state.searching ? <img src={Loader} alt="loading" /> : ""}
          </div>
          <div className="cards-wrap">{this.state.movies}</div>
        </div>
      </div>
    );
  }
  onFocus = (e) => {
    e.target.parentElement.classList.add("focused");
  };
  onBlur = (e) => {
    e.target.parentElement.classList.remove("focused");
  };
  searchAPI = (e) => {
    const searchTerm = e.target.value;

    // Cancel previous requests
    if (this.aborter) this.aborter.abort();
    this.aborter = new AbortController();
    const signal = this.aborter.signal;

    this.setState({ searchTerm: searchTerm, searching: true });

    if (searchTerm.length) {
      // this.setState((prevState) => {
      //   debugger
      //   return { searchTerm: searchTerm, searching: !prevState.searching };
      // });

      fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=6f4582b964f96a9f0ef0464619a70097&query=${searchTerm}`,
        { signal: signal }
      )
        .then((res) => res.json())
        .then((res) => {
          this.renderRows(res.results);
        })
        .catch((err) => {
          if (err.name === "AbortError") {
          } else {
            console.error("Uh oh, an error!", err);
          }
        });
    } else {
      this.setState({ movies: null, searching: false });
    }
  };
  renderRows(data) {
    const movies = [];
    let imgPath = "https://image.tmdb.org/t/p/w400";
    if (data.length) {
      data.forEach((item) => {
        movies.push(
          <MovieRow
            key={item.id}
            title={item.title}
            img={item.poster_path ? imgPath + item.poster_path : NotFound}
            release={item.release_date}
          />
        );
      });
    }
    this.setState((prevState) => ({ movies: movies, searching: false }));
  }
}

export default App;
