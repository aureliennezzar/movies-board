import './MovieTile.scss'
import React from 'react';
import {Link} from "react-router-dom";

const MovieTile = ({title, desc, imgSrc, movieId}) => {
    return (
        <li className="movie-tile">
            <Link to={"/movie/" + movieId}>
                <div className="img">
                    <img src={imgSrc}/>
                </div>
                <h3 className="title">{title}</h3>
                <p className="desc">{desc}</p>
            </Link>
        </li>
    )
}
export default MovieTile;