import { Redirect, Route, Switch } from "react-router-dom";
import "./App.css";
import Movie from "./Components/Movie";
import Customers from "./Components/Customers";
import Rentals from "./Components/Rentals";
import NavBar from "./Components/common/NavBar";
import NotFound from "./Components/common/NotFound";
import MovieDetails from "./Components/MovieDetails";
import Login from "./Components/common/Login";
import Register from "./Components/common/Register";
import MovieForm from "./Components/MovieForm";

function App() {
  return (
    <>
      <NavBar />
      <main className="container">
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/movies/new" component={MovieForm} />
          <Route path="/movies/:id" component={MovieDetails} />
          <Route path="/movies" component={Movie} />
          <Route path="/customers" component={Customers} />
          <Route path="/rentals" component={Rentals} />
          <Route path="/not-found" component={NotFound} />
          <Route path="/" exact component={Movie} />
          <Redirect to="/not-found" />
        </Switch>
      </main>
    </>
  );
}

export default App;
