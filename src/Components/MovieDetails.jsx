import React, { Component } from "react";
import MovieForm from "./MovieForm";

class MovieDetails extends Component {
  render() {
    const {props} = this
    return (
      <>
        <MovieForm {...props}/>
      </>
    );
  }
}

export default MovieDetails;
