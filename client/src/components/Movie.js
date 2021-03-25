import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';

import axios from 'axios';

import { Context } from '../App'

const Movie = (props) => {
  const { addToFavorites } = props;
  const { setMovies, favoriteMovies, setFavoriteMovies } = useContext(Context)
  const [movie, setMovie] = useState('');

  const { id } = useParams();
  const { push } = useHistory();

  useEffect(()=>{
    axios.get(`http://localhost:5000/api/movies/${id}`)
      .then(res=>{
        setMovie(res.data);
      })
      .catch(err=>{
        console.log(err);
      })
  }, [id]);

  function deleteMovie(){
    if(!window.confirm(`Are you sure you want to delete ${movie.title}?`))
      return
    axios.delete(`http://localhost:5000/api/movies/${id}`)
      .then( res => {
        setMovies(res.data)
        props.history.push('/movies')
      })
      .catch( err => {
        console.log(err.response)
      })
  }

  function favoriteMovie(){
    const favMoviesFiltered = favoriteMovies.filter( fav => fav.id !== movie.id)
    if(favMoviesFiltered.length === favoriteMovies.length){
      setFavoriteMovies([
        ...favoriteMovies,
        movie
      ])
    } else {
      setFavoriteMovies([
        ...favMoviesFiltered
      ])
    }
  }

  return(<div className="modal-page col">
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">						
          <h4 className="modal-title">{movie.title} Details</h4>
        </div>
        <div className="modal-body">
          <div className="flexContainer">

            <section className="movie-details">
              <div>
                <label>Title: <strong>{movie.title}</strong></label>
              </div>
              <div>
                <label>Director: <strong>{movie.director}</strong></label>
              </div>
              <div>
                <label>Genre: <strong>{movie.genre}</strong></label>
              </div>
              <div>
                <label>Metascore: <strong>{movie.metascore}</strong></label>
              </div>
              <div>
                  <label>Description:</label>
                <p><strong>{movie.description}</strong></p>
              </div>
            </section>
            
            <section>
              <span className="m-2 btn btn-dark" onClick={favoriteMovie}>Favorite</span>
              <Link to={`/movies/edit/${movie.id}`} className="m-2 btn btn-success">Edit</Link>
              <span className="delete"><input type="button" className="m-2 btn btn-danger" value="Delete" onClick={deleteMovie}/></span>
            </section>
          </div>
        </div>
      </div>
    </div>
  </div>);
}

export default Movie;