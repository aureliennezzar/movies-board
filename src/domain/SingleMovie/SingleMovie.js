import './SingleMovie.scss'
import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {getMovieData} from "../../utils/crud";

const SingleMovie = () => {
    const {id} = useParams();
    const [movieData, setMovieData] = useState(null);
    useEffect(() => {
        getMovieData(id, setMovieData);
    }, [])
    useEffect(() => {
        console.log(movieData)
    }, [movieData])

    return (
        <section className="single-movie">
            {movieData && <>

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
                                        <div className="bg-img">
                                            <img src={actor.photo}/>
                                        </div>
                                        <div className="actor-tile-body">
                                            <h3 className="title">{actor.name}</h3>
                                            <p className="role">{actor.character}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="bloc-info">
                            <h3 className="bloc-title">Film(s) similaire(s)</h3>
                            <ul className="similar-movies">
                                {movieData.similar_movies.map((movie, i) => (
                                    <li className="actor-tile" key={i}>
                                        <div className="bg-img">
                                            <img src={movie.poster}/>
                                        </div>
                                        <div className="actor-tile-body">
                                            <h3 className="title">{movie.title}</h3>
                                            <p className="role">{movie.release_date}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </>}
        </section>
    )
}
export default SingleMovie;