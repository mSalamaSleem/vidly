import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import MoviesTable from "./MoviesTable";
import Pagination from "./common/Pagination";
import { paginate } from "../utils/paginate";
import ListGroup from "./common/ListGroup";
import _ from "lodash";

export default class Movie extends Component {
  state = {
    movies: [],
    genres: [],
    isLike: false,
    pageSize: 5,
    currentPage: 1,
    currentGenre: "",
    sortColumn: { path: "title", order: "asc" },
  };

  componentDidMount() {
    let genres = [{ _id: "", name: "All Genre" }, ...getGenres()];
    this.setState({ movies: getMovies(), genres });
  }

  handleMovieDelete = (MoiveId) => {
    const movies = this.state.movies.filter((movie) => movie._id !== MoiveId);
    this.setState({ movies: movies });
  };

  handleMovieLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movie };
    movies[index].isLike = !movies[index].isLike;
    this.setState({ movies });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleGenreChange = (genre) => {
    this.setState({ currentGenre: genre, currentPage: 1 });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  getPageData = () => {
    const {
      pageSize,
      currentPage,
      movies: allMovies,
      currentGenre,
      sortColumn,
    } = this.state;

    let filtered =
      currentGenre && currentGenre._id
        ? allMovies.filter((movie) => {
            return movie.genre._id === currentGenre._id;
          })
        : allMovies;

    let sortedMovies = _.orderBy(
      filtered,
      [sortColumn.path],
      [sortColumn.order]
    );
    let movies = paginate(sortedMovies, currentPage, pageSize);
    return { totalCount: filtered.length, movies };
  };

  render() {
    const { length: count } = this.state.movies;
    const { pageSize, currentPage, genres, currentGenre, sortColumn } =
      this.state;

    if (count === 0) return <h1>No Moives Found</h1>;

    const { totalCount, movies } = this.getPageData();

    return (
      <>
        <div className="row">
          <div className="col-3  mt-5">
            <ListGroup
              items={genres}
              onItemSelected={this.handleGenreChange}
              selectedItem={currentGenre}
            />
          </div>
          <div className="col-9">
            <MoviesTable
              movies={movies}
              sortColumn={sortColumn}
              onLike={this.handleMovieLike}
              onDelete={this.handleMovieDelete}
              onSort={this.handleSort}
            />
            <Pagination
              itemsCount={totalCount}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={this.handlePageChange}
            />
          </div>
        </div>
      </>
    );
  }
}
