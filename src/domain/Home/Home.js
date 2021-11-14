import React, {useEffect, useState} from "react"
import axios from "axios";
import searchImg from "../../assets/img/loupe.svg"
import bgImg from "../../assets/img/mandalorian.jpg"
import "./Home.scss"
import MovieTile from "../../components/MovieTile/MovieTile";
import {getAllMovies, getCategories} from "../../utils/crud";
import {logDOM} from "@testing-library/react";
import {dateToTimestamp} from "../../utils/utils";

const Home = () => {
    const defaultInputs = {
        title: "",
        date: "",
        categorie: ""
    }
    const [inputs, setInputs] = useState(defaultInputs)
    const [movies, setMovies] = useState([]);
    const [displayMovies, setDisplayMovies] = useState([]);
    const [allCategories, setAllCategories] = useState([]);
    const handleSubmit = (e) => {
        e.preventDefault()
        let filteredMovies = movies;
        if (inputs.title.length) {
            filteredMovies = movies.filter((movie) => movie.title.toLowerCase().includes(inputs.title.toLowerCase()))
        }
        if (inputs.date.length) {
            filteredMovies = movies.filter((movie) => dateToTimestamp(movie.release_date) <= dateToTimestamp(inputs.date))
        }
        if (inputs.categorie.length) {
            filteredMovies = movies.filter((movie) => movie.categories.includes(inputs.categorie))
        }
        setDisplayMovies(filteredMovies);
    }
    const handleChange = (e) => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        })
    }
    useEffect(() => {
        // GET ALL MOVIES IN THE LIBRARY
        getAllMovies(setMovies);
        getCategories(setAllCategories)
    }, [])
    useEffect(() => {
        setDisplayMovies(movies)
    }, [movies])
    return (
        <section className="homepage">
            <div className="hero">
                <h1>My Movie List</h1>
                <img className="hero-bg" src={bgImg}/>
                <div className="hero-body">
                    <form onSubmit={handleSubmit} className="search-form">
                        <input
                            className="home-input home-text-input"
                            type="text"
                            placeholder="Titre..."
                            name="title"
                            onInput={handleChange} value={inputs.title}/>
                        <input
                            className="home-input"
                            type="date"
                            onInput={handleChange}
                            name="date"
                            value={inputs.date}
                        />
                        <select className="home-input home-select-input" name="categorie" onChange={handleChange}
                                value={inputs.categorie}>

                            <option value="">Choisir une option</option>
                            {allCategories.map((categorie, i) => (
                                <option value={categorie} key={i}>{categorie}</option>
                            ))}
                        </select>
                        <button type="submit">
                            <div className="icon-filter"></div>
                        </button>
                    </form>
                </div>
            </div>

            <div className="movies-list">
                <h1 className="page-title">Mes films</h1>
                <div className="movies-list-wrapper">
                    <ul>
                        {displayMovies.length
                            ? displayMovies.map((movie, i) => (
                                <MovieTile key={i} title={movie.title} desc={movie.description} imgSrc={movie.poster}
                                           movieId={movie.id}/>
                            ))
                            : <h3 className="empty-text">Aucun film.</h3>
                        }
                    </ul>
                </div>
            </div>
        </section>
    )
}

export default Home;