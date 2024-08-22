import React, { Component } from "react";
import { Link } from "react-router-dom";

class MovieDetails extends Component {
  render() {
    return (
      <>
        <h1>Movie {this.props.match.params.id}</h1>
        <Link to="/movies" className="btn btn-sm btn-success">
          save
        </Link>
      </>
    );
  }
}

export default MovieDetails;
