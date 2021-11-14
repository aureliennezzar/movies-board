import './SingleMovie.scss'
import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {getMovieData} from "../../utils/crud";

const SingleMovie = () => {
    const {id} = useParams();
    const [movieData, setMovieData] = useState(null);
    const [simMov, setSimMov] = useState(false)
    useEffect(() => {
        getMovieData(id, setMovieData);
    }, [])
    useEffect(() => {
        console.log(movieData)
    }, [movieData])

    return (
        <section className={`single-movie ${simMov ? "sim-open" : ""}`}>
            {movieData && <>
                <div className="icon-list" onClick={() => setSimMov(!simMov)}></div>

                <div className="bg">
                    <img src={movieData.backdrop} alt=""/>
                </div>
                <div className="single-movie-hero">
                    <div className="meta">
                        <div className="left">
                            <img src={movieData.poster} alt=""/>
                        </div>
                        <div className="right">
                            <h2>{movieData.title}</h2>
                            <ul className={"categories"}>
                                {movieData.categories.map((categorie, i) => (
                                    <li key={i}>{categorie}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="movie-body">
                    <div className="left">
                        <h3 className="bloc-title">Date de sortie</h3>
                        <p className="date">{movieData.release_date}</p>
                    </div>
                    <div className="right">
                        <div className="bloc-info">

                            <h3 className="bloc-title">Synopsis</h3>
                            <p className="desc">{movieData.description}</p>
                        </div>
                        <div className="bloc-info">
                            <h3 className="bloc-title">Acteur(s) / Actrice(s)</h3>
                            <ul className="actors">
                                {movieData.actors.map((actor, i) => (
                                    <li className="actor-tile" key={i}>
                                        <div className="actor-tile-content">
                                            <div className="bg-img">
                                                <img src={actor.photo}/>
                                            </div>
                                            <div className="actor-tile-body">
                                                <h3 className="title">{actor.name}</h3>
                                                <p className="role">{actor.character}</p>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="similar-movies">
                    <div className="bloc-title">
                        <h3>Films Similaires</h3>
                    </div>
                    <ul className="similar-movies-list">
                        {movieData.similar_movies.map((movie, i) => (
                            <li className="simmovie-tile" key={i}>
                                <div className="left">
                                    <img src={movie.poster}/></div>
                                <div className="right">
                                    <h4 className="title">{movie.title}</h4>
                                    <p className="role">{movie.release_date}</p></div>
                            </li>
                        ))}
                    </ul>
                </div>
            </>}
        </section>
    )
}
export default SingleMovie;