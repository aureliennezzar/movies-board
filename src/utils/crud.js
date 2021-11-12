import {storageRef} from "./firebase";
import axios from "axios";

const API = "http://localhost:3001"
const TMDB_KEY = "?api_key=" + process.env.REACT_APP_TMD_API_KEY
const tmdbAPI = "https://api.themoviedb.org/3"
const imgpath = "https://image.tmdb.org/t/p/original/"
export const uploadImage = (file, uid, setProgress) => {
    return new Promise(resolve => {
        const task = storageRef.child(`${uid}/${file.name}`).put(file)
        if (file !== undefined && file.type.split('/')[0] === "image") {
            task.on('state_changed',
                function progress(snap) {
                    let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
                    if (setProgress) setProgress(percentage.toFixed(0))
                }, function error(err) {
                    console.log("error", err)
                }, function complete() {
                    if (setProgress) setProgress(100)
                }
            )
            task.then(function (snap) {
                const {name} = snap.ref
                snap.ref.getDownloadURL().then((url) => {
                    resolve({name, url});
                });
            })
        }
    })
}

export const addMovie = (data) => {
    axios.post(API + '/movies', data, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}
export const editMovie = (movieId, data) => {
    axios.put(API + '/movies/' + movieId, data, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

export const getAllMovies = (setMovies) => {
    axios.get(API + '/movies')
        .then(res => {
            setMovies(res.data)
        })
}

export const getCategories = (setCategories) => {

    axios.get(API + '/movies')
        .then(res => {
            const movies = res.data;
            const moviesCategories = movies.map(movie => movie.categories);
            let allCategories = []
            moviesCategories.forEach(movieCategorie => {
                movieCategorie.forEach(categorie => {
                    if (allCategories.indexOf(categorie) < 0) {
                        allCategories.push(categorie)
                    }
                })
            })
            setCategories(allCategories)
        })
}

export const getMovieData = (movieId, setData, edit = false) => {
    axios.get(API + '/movies/' + movieId)
        .then(res => {
            setData(res.data)
        })

}

export const getTmdbMovie = (setData, queries) => {
    axios.get(tmdbAPI + '/search/movie' + TMDB_KEY + queries)
        .then(res => {
            setData(res.data.results)
        })
}

export const convertMovie = (data, setInputs, setActorsList, setCategoriesList, setMoviesList) => {
    let getCategories = "https://api.themoviedb.org/3/genre/movie/list" + TMDB_KEY
    let getSimilarMovies = `https://api.themoviedb.org/3/movie/${data.id}/similar${TMDB_KEY}`
    let getCredits = `https://api.themoviedb.org/3/movie/${data.id}/credits${TMDB_KEY}`
    const categoriesFetch = axios.get(getCategories);
    const similarMoviesFetch = axios.get(getSimilarMovies);
    const creditsFetch = axios.get(getCredits);

    axios
        .all([categoriesFetch, similarMoviesFetch,creditsFetch])
        .then(
            axios.spread((...res) => {
                const categorieRes = res[0].data.genres;
                const similarMoviesRes = res[1].data.results;
                const creditsRes = res[2].data.cast

                //GET ACTORS
                let newActors = []
                newActors = creditsRes.map((actor)=>({
                    name:actor.name,
                    character:actor.character,
                    photo: imgpath + actor.profile_path
                }))

                //GET SIMILAR MOVIES
                let newSimilarMovies = []
                newSimilarMovies = similarMoviesRes.map((movie) => ({
                    poster: imgpath + movie.poster_path,
                    title: movie.title,
                    release_date: movie.release_date
                }))
                //GET CATEGORIES
                let newCategories = []
                data.genre_ids.forEach((id) => {
                    newCategories = [...newCategories, ...categorieRes.filter((categorie) => categorie.id === id)]
                })
                newCategories = newCategories.map(cat => cat.name)


                const {title, release_date} = data
                let newInputs = {
                    title,
                    release_date,
                    poster: imgpath + data.poster_path,
                    backdrop: imgpath + data.backdrop_path,
                    description: data.overview,
                    posterName: "Affiche",
                    backdropName: "Arrière-plan"
                }
                //SET INPUTS
                setInputs(newInputs);
                //SET SIMILAR MOVIES
                setMoviesList(newSimilarMovies)

                //SET ACTORS
                setActorsList(newActors)
                //SET CATEGORIES
                setCategoriesList(newCategories)

            })
        )

}