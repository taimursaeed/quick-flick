// @ts-nocheck
import React from "react";
import "./App.scss";
import Header from "./components/header";
import MoviesList from "./components/moviesList";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      searchTerm: "",
      isFetching: false,
      hasError: false,
    };
    this.aborter = null;
    this.movies = [];
  }

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
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
      if (this.movies.page < this.movies.total_pages) {
        this.setState({ isFetching: true });
        this.fetchMovies(
          this.state.searchTerm,
          this.movies.page + 1,
          (data) => {
            this.movies.page = data.page;
            this.movies.results = this.movies.results.concat(data.results);
            this.setState({ isFetching: false });
          }
        );
      }
    }
  };

  fetchMovies = (searchTerm, currentPage, callback) => {
    this.setState({ hasError: false });

    // First cancel previous requests
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
          this.setState({ hasError: true });
        }
      });
  };

  handleSearch = (e) => {
    const searchTerm = e.target.value;
    const currentPage = this.state.currentPage;

    if (searchTerm.length) {
      this.setState({ searchTerm: searchTerm, isFetching: true });
      this.fetchMovies(searchTerm, currentPage, (data) => {
        this.movies = data;
        this.setState({
          isFetching: false,
          loadMore: false,
          currentPage: 1,
          totalPages: data.total_pages,
        });
      });
    } else {
      this.movies = [];
      this.setState({
        searchTerm: searchTerm,
        loadMore: false,
        currentPage: 1,
        totalPages: 1,
      });
    }
  };

  render() {
    return (
      <div className="App">
        <div className="container-fluid">
          <Header
            onChange={this.handleSearch}
            isFetching={this.state.isFetching}
            searchTerm={this.state.searchTerm}
          />
          {this.state.hasError ? (
            <>
              <div className="mx-auto my-5 p-2 rounded-left rounded-right text-center w-25 text-muted">
                <div className="mb-3 h1">(·_·)</div>
                <p className="mb-0">Uh oh, an error!</p>
              </div>
            </>
          ) : (
            <MoviesList
              searchTerm={this.state.searchTerm}
              fetchCompleted={!this.state.isFetching}
              movies={this.movies}
            />
          )}
        </div>
      </div>
    );
  }
}

export default App;
