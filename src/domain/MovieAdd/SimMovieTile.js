import React from 'react';
import './SimMovieTile.scss'

const SimMovieTile = ({title,poster,date, setMovies, movies}) => {
    const handleRemove = ()=>{
        if(window.confirm("Êtes-vous sûr de vouloir faire ça ?")){
            setMovies(movies.filter(movie => movie.title !== title))
        }
    }
    return (
        <li className="sim-movie-tile">
            <div className="delete-btn" onClick={handleRemove}>x</div>
            <div className="bg-img">
                {poster && <img src={poster}/>}
            </div>
            <div className="movie-tile-body">
                <h3 className="title">{title}</h3>
                <p className="role">{date}</p>
            </div>
        </li>
    )
}
export default SimMovieTile;