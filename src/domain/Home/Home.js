import React, {useEffect, useState} from "react"
import axios from "axios";
import searchImg from "../../assets/img/loupe.svg"
import bgImg from "../../assets/img/mandalorian.jpg"
import "./Home.scss"
import MovieTile from "../../components/MovieTile/MovieTile";

const Home = () => {
    const [input, setInput] = useState("")
    const [movies, setMovies] = useState([]);
    useEffect(() => {
        // GET ALL MOVIES IN THE LIBRARY
        axios.get(`http://localhost:3000/movies`)
            .then(res => {

                setMovies(res.data)
                console.log(res.data)
            })
    }, [])
    return (
        <section className="homepage">
            <div className="hero">
                <h1>Bienvenue sur My Movie List</h1>
                <img className="hero-bg" src={bgImg}/>
                <div className="hero-body">
                    <form onSubmit={() => console.log('submit')} className="search-form">
                        <input className="home-input home-text-input" type="text" placeholder="Titre..." onInput={(e) => setInput(e.target.value)} value={input}/>
                        <input className="home-input"  type="date"/>
                        <select className="home-input home-select-input" name="" id="">
                            <option>Catégorie</option>
                            <option>Action</option>
                            <option>Action</option>
                        </select>
                        <button type="submit"><img src={searchImg}/></button>
                    </form>
                </div>
            </div>

            <div className="movies-list">
                <h1 className="page-title">Mes films</h1>

                <ul>
                    {movies && movies.map((movie) => (
                        <MovieTile title={movie.title} desc={movie.description} imgSrc={movie.poster} movieId={movie.id}/>
                    ))}
                </ul>
            </div>
        </section>
    )
}

export default Home;