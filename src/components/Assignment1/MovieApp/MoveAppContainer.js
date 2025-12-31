import MovieData from "../Database/MovieData";
import "./MovieAppContainer.css";
import { useState } from "react";

function MovieAppContainer({theme}){
    const [favorites, setFavorites ] = useState([]);
    const [searchTerm, setSearchTerm ] = useState("");

    function Favorite() {
        return (
             <div className="favorite-movies">
                <h2> Favorite Movies </h2>
                {favorites.length > 0 ? (
                    <ul>
                        {favorites.map((movie, index) => (
                            <li className="favorite-movie-info" key={index}>{movie.title} ({movie.year}) 
                                <button className="remove-favorite" onClick={() => removeFromFavorites(movie.id)}>Remove from Favorites</button>
                            </li>
                        ))}
                    </ul>
                ) : (       
                <p>No favorite movies added yet.</p>    
                )}
            </div>
        );
    }

    const addToFavorites = (movie) => { 
        if (favorites.find((favMovie) => favMovie.id === movie.id)) {    
            alert("Movie is already in favorites!"); 
            return;   
        }       
        setFavorites([...favorites, movie]);    
    };

    const removeFromFavorites = (movieId) => {
        const newFavorites = favorites.filter((movie) => movie.id !== movieId);
        setFavorites(newFavorites);
    };

     const filteredMovies = MovieData.filter((movie) =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        movie.genre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        movie.year.toString().includes(searchTerm) ||
       movie.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
     );


    return (
        <div className="movie-app">
            <div className="movie-header">
                <h1> Movie App </h1>
            </div>
            <div className="search-bar">
                <input 
                    type="text" 
                    placeholder="Search movies..." 
                    value={searchTerm} 
                    onChange={(e) => setSearchTerm(e.target.value)} 
                />
                <button onClick={() => setSearchTerm("")}>Reset</button>
            </div>  
            <div className="movie-container">

                {filteredMovies.length === 0 && (                      
                    <p className="no-movies-message"> No movies found matching "{searchTerm}"</p>
                )}

                {filteredMovies.map((movie) => (
                    <div key={movie.id} className={`movie-card ${theme}`}>
                        <div className="movie-info">
                            <h2 className="movie-title">{movie.title}</h2>
                            <p className="movie-release-year">Release Year: {movie.year}</p>
                            <p className="movie-genre">Genre: {movie.genre}</p>
                            <span className="rating">{movie.rating}</span>
                            {movie.tags.map((tag, index) => 
                                <span key={index} className="tag-item">{tag}</span>
                            )
                            }
                            <button className="favorite" onClick={() => addToFavorites(movie)}>Add to Favorites</button>
                        </div>
                    </div>
                ))}
            </div>

            <Favorite />
                      
        </div>
    );

}


export default MovieAppContainer
