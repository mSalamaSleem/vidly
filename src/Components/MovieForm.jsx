import React from 'react'
import Form from './common/Form';
import Joi from "joi-browser";
import { getGenres } from '../services/fakeGenreService';
import { getMovies, saveMovie } from '../services/fakeMovieService';


class MovieForm extends Form{
    state = {
        genres: [],
        data: { title: "", genreId: "", numberInStock: "", dailyRentalRate: ""},
        errors: {},
      };

      schema = {
        _id: Joi.string(),
        title: Joi.string().required().label("Title"),
        genreId: Joi.string().required().label("Genre"),
        numberInStock: Joi.number()
          .required()
          .min(0)
          .max(100)
          .label("Number In Stock"),
        dailyRentalRate: Joi.number()
          .required()
          .min(0)
          .max(10)
          .label("Daily Rental Rate"),
      };

      componentDidMount() {
        const genres = getGenres();
        this.setState({ genres });

        const movieId = this.props.match.params.id;
        if (!movieId) return;
        
        const movie = this.getMovie(movieId);
        if (!movie) return this.props.history.replace("/not-found");
        this.setState({ data: this.mapToViewModel(movie) });
      }
    
      doSubmit = () => {
        // const {title, genreId, numberInStock, dailyRentalRate} = this.state.data
        // const {genres} = this.state
        // const {id: movieId} = this.props.match.params
        // const newMovie = {
        //     _id: movieId ? movieId : "",
        //     title: title,
        //     genreId: genres.find((genre) => genre._id === genreId)._id,
        //     numberInStock: Number(numberInStock),
        //     dailyRentalRate: Number(dailyRentalRate),
        // }
        saveMovie(this.state.data)
        this.props.history.push('/movies');
      }

      getMovie = (movieId) => {
        return getMovies().find((m) => m._id === movieId)
      }

      mapToViewModel = (movie) => {
        return {
          _id: movie._id,
          title: movie.title,
          genreId: movie.genre._id,
          numberInStock: movie.numberInStock,
          dailyRentalRate: movie.dailyRentalRate
        }
      }
    
      render() {   
        return (
          <>
            <form onSubmit={this.handleSubmit}>
              {this.returnInput('title', 'Title')}
              {this.returnSelection('genreId', 'Genre', this.state.genres)}
              {this.returnInput('numberInStock', 'Number In Stock')}
              {this.returnInput('dailyRentalRate', 'Rate')}
              {this.returnButton('Save')}
            </form>
          </>
        );
      }
}

export default MovieForm