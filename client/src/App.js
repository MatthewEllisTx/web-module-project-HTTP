import React, { useEffect, useState, createContext } from "react";

import { Route, Switch, Redirect } from "react-router-dom";
import MovieList from './components/MovieList';
import Movie from './components/Movie';

import MovieHeader from './components/MovieHeader';

import EditMovieForm from './components/EditMovieForm';
import FavoriteMovieList from './components/FavoriteMovieList';

import axios from 'axios';

export const Context = createContext();

const App = (props) => {
  const [movies, setMovies] = useState([]);
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  useEffect(()=>{
    axios.get('http://localhost:5000/api/movies')
      .then(res => {
        setMovies(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const deleteMovie = (id)=> {
    // don't use because the server just return the array anyway in this case
    setMovies(movies.filter( movie => movie.id !== id))
  }

  const addToFavorites = (movie) => {
    
  }

  const contextValues = {
    movies,
    setMovies,
  }

  return (
    <div>
      <nav className="navbar navbar-dark bg-dark">
        <span className="navbar-brand" ><img width="40px" alt="" src="./Lambda-Logo-Red.png"/> HTTP / CRUD Module Project</span>
      </nav>

      <Context.Provider value={contextValues}>
        <div className="container">
          <MovieHeader/>
          <div className="row ">
            <FavoriteMovieList favoriteMovies={favoriteMovies}/>
          
            <Switch>
              <Route path="/movies/edit/:id" component={EditMovieForm} />

              <Route path="/movies/:id" component={Movie} />

              <Route path="/movies">
                <MovieList movies={movies}/>
              </Route>

              <Route path="/">
                <Redirect to="/movies"/>
              </Route>
            </Switch>
          </div>
        </div>
      </Context.Provider>
    </div>
  );
};


export default App;

