import React from "react";
import "./App.scss";
import "./Movies";
import Movies from "./Movies";
import NotFound from "./assets/not-found.png";
import Logo from "./assets/logo.svg";
import Loader from "./assets/loader.svg";
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      searchTerm: "",
      searching: false,
      notFound: false,
      loadMore: false,
      currentPage: 1,
      totalPages: 1,
    };
    this.aborter = null;
  }

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }
  componentDidUpdate() {
    console.log("componentDidUpdate");
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  render() {
    const movies = this.state.movies;
    let imgPath = "https://image.tmdb.org/t/p/w400";
    let moviesList = [];

    if (movies.length) {
      movies.forEach((item) => {
        moviesList.push(
          <Movies
            key={item.id}
            title={item.title}
            img={item.poster_path ? imgPath + item.poster_path : NotFound}
            release={item.release_date}
          />
        );
      });
    }
    if (this.state.notFound) {
      moviesList = (
        <p className="text-center" style={{ flex: 1 }}>
          No result found
        </p>
      );
    }

    let loadMore = null;

    if (!this.state.notFound && this.state.currentPage >= 1) {
      if (this.state.loadMore) {
        loadMore = (
          <div className="load-more">
            <img src={Loader} alt="loader" />
          </div>
        );
      } else {
        if (
          this.state.searchTerm.length &&
          this.state.currentPage > this.state.totalPages
        ) {
          loadMore = <div className="text-center my-4">End of results</div>;
        }
      }
    }

    return (
      <div className="App">
        <div className="container-sm">
          <div className="logo my-4 text-center ">
            <img src={Logo} alt="Logo" />
            <h1>Movies Search</h1>
          </div>
          <div className="search">
            <input
              className="form-control mb-4"
              type="text"
              placeholder="Search movies, series and episodes...."
              onChange={this.handleChange}
              onFocus={this.onFocus}
              onBlur={this.onBlur}
              value={this.state.searchTerm}
            ></input>
            {this.state.searching ? <img src={Loader} alt="loading" /> : ""}
          </div>
          {/* <Search /> */}
          <div className="cards-wrap">{moviesList}</div>
          {loadMore}
        </div>
      </div>
    );
  }

  handleScroll = () => {
    const bottomThreshold = 400;
    const windowHeight =
      "innerHeight" in window
        ? window.innerHeight
        : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
    );
    const windowBottom = windowHeight + window.pageYOffset;
    if (this.state.searchTerm && windowBottom >= docHeight - bottomThreshold) {
      console.log("bottom reached");
      if (
        !this.state.loadMore &&
        this.state.currentPage <= this.state.totalPages
      ) {
        this.setState({ loadMore: true });
        let currentPage = this.state.currentPage + 1;

        this.fetchMovies(this.state.searchTerm, currentPage, (data) => {
          this.setState((prevState) => ({
            movies: prevState.movies.concat(data.results),
            currentPage: currentPage,
            loadMore: false,
          }));
        });
      }
    }
  };

  fetchMovies = (searchTerm, currentPage, callback) => {
    // Cancel previous requests
    if (this.aborter) this.aborter.abort();
    this.aborter = new AbortController();
    const signal = this.aborter.signal;
    fetch(
      `${process.env.REACT_APP_API_URL}?api_key=${process.env.REACT_APP_API_KEY}&query=${searchTerm}&page=${currentPage}`,
      { signal: signal }
    )
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        callback(res);
      })
      .catch((err) => {
        if (err.name === "AbortError") {
          return;
        } else {
          console.error("Uh oh, an error!", err);
        }
      });
  };

  handleChange = (e) => {
    const searchTerm = e.target.value;
    const currentPage = this.state.currentPage;

    if (searchTerm.length) {
      this.setState({ searchTerm: searchTerm, searching: true });
      this.fetchMovies(searchTerm, currentPage, (data) => {
        this.setState({
          movies: data.results,
          searching: false,
          loadMore: false,
          notFound: !data.results.length,
          currentPage: 1,
          totalPages: data.total_pages,
        });
      });
    } else {
      this.setState({
        searchTerm: searchTerm,
        movies: [],
        searching: false,
        loadMore: false,
        notFound: false,
        currentPage: 1,
        totalPages: 1,
      });
    }
  };
}

export default App;
