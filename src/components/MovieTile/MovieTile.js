import './MovieTile.scss'
import React from 'react';
import {Link} from "react-router-dom";

const MovieTile = ({title, desc, imgSrc, movieId}) => {
    const handleDelete = () => {
        console.log("delete")
    }
    const handleEdit = () => {
        console.log("edit")
    }
    return (
        <li className="movie-tile">
            <div className="actions">
                <Link to={"/edit/" + movieId} className="btn icon-edit"></Link>
                <div className="btn icon-delete" onClick={handleDelete}></div>
            </div>
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