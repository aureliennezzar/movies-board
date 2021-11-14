import './MovieTile.scss'
import React, {useState} from 'react';
import {Link} from "react-router-dom";
import {deleteMovie} from "../../utils/crud";
import Confirm from "../Confirm/Confirm";

const MovieTile = ({title, desc, imgSrc, movieId}) => {
    const [confirm, setConfirm] = useState(false)
    return (
        <li className="movie-tile">
            <div className="actions">
                <Link to={"/edit/" + movieId} className="icon-edit"></Link>
                <div className="icon-delete" onClick={() => setConfirm(true)}></div>
            </div>
            <Link to={"/movie/" + movieId}>
                <div className="img">
                    <img src={imgSrc}/>
                </div>
                <h3 className="title">{title}</h3>
                <p className="desc">{desc}</p>
            </Link>
            {confirm &&
            <Confirm
                message={"Êtes-vous sûr de vouloir supprimer ce film ?"}
                abortMessage={"Annuler"}
                setConfirm={setConfirm}
                onConfirm={() => {
                    deleteMovie(movieId);
                    window.location.reload()
                }}

            />
            }
        </li>
    )
}
export default MovieTile;