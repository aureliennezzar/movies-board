import '../MovieAdd/MovieAdd.scss'
import React, {useEffect, useState} from 'react';
import {uploadImage, addMovie, getCategories, getMovieData, editMovie} from "../../utils/crud";
import ActorTile from "../MovieAdd/ActorTile";
import SimMovieTile from "../MovieAdd/SimMovieTile";
import {Autocomplete, TextField} from "@mui/material";
import CategorieInput from "../../components/CategorieInput/CategorieInput";
import {useParams} from "react-router-dom";

const backdropPlaceholder = "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.10wallpaper.com%2Ffr%2Flist%2FBeautiful_Nature_Scenery_4K_HD_Photo.html&psig=AOvVaw3TszFs97KeGsudUQMZk23b&ust=1636675673321000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCJD51ZKCj_QCFQAAAAAdAAAAABAD"
const posterPlaceholder = "https://firebasestorage.googleapis.com/v0/b/my-movies-list-23f59.appspot.com/o/images%2Fdefault-placeholder.png?alt=media&token=c6082f11-8efe-42cc-b43d-c7b23b75f9b0"
const avatarPlaceholder = "https://firebasestorage.googleapis.com/v0/b/my-movies-list-23f59.appspot.com/o/images%2Fsbcf-default-avatar.png?alt=media&token=d9863a53-4983-47d4-9ce7-434a9b5c9268"
const MovieEdit = () => {
    const {id} = useParams()
    const defaultActorData = {
        name: "",
        photo: "",
        photoName: "",
        character: ""
    }
    const defaultMovieData = {
        title: "",
        poster: "",
        posterName: "",
        release_date: ""
    }
    const [data, setData] = useState({})

    const [inputs, setInputs] = useState({
        title: "",
        description: "",
        poster: posterPlaceholder,
        backdrop: backdropPlaceholder,
        release_date: "",
        posterName: "",
        backdropName: ""
    });
    const [actorForm, setActorForm] = useState(false);
    const [actorData, setActorData] = useState(defaultActorData);

    const [movieForm, setMovieForm] = useState(false);
    const [movieData, setMovieData] = useState(defaultMovieData);

    const [actorProgress, setActorProgress] = useState(100);
    const [movieProgress, setMovieProgress] = useState(100);
    const [posterProgress, setPosterProgress] = useState(100);
    const [backdropProgress, setBackdropProgress] = useState(100);

    const [actorsList, setActorsList] = useState(data.actors)
    const [moviesList, setMoviesList] = useState(data.similar_movies)

    const [categoriesList, setCategoriesList] = useState(data.categories)
    const [allCategories, setAllCategories] = useState([])


    useEffect(() => {
        getCategories(setAllCategories);
        getMovieData(id, setData)
    }, [])

    useEffect(() => {
        setCategoriesList(data.categories);
        setActorsList(data.actors)
        setMoviesList(data.similar_movies)
        setInputs(
            {
                ...data,
                posterName: "affiche",
                backdropName: "arrière plan"
            }
        )
    }, [data])

    // HANDLE ADD MOVIE SUBMIT
    const handleSubmit = (e) => {
        const newData = inputs
        e.preventDefault()
        if (
            !actorsList.length ||
            !categoriesList.length ||
            !newData.title.length ||
            !newData.description.length ||
            !newData.release_date.length ||
            !moviesList.length
        ) {
            alert("Veuillez remplir tout les champs");
            return
        }
        delete newData.posterName
        delete newData.backdropName
        delete newData.id
        newData.actors = actorsList
        newData.similar_movies = moviesList
        newData.categories = categoriesList
        editMovie(id, {...newData})
        alert('Le film à bien été modifié !')
        window.location.href = "/"
    }

// HANDLE ACTOR FORM
    const handleActorSubmit = (e) => {
        const actorsValid = actorsList.filter(item => item.name === actorData.name)
        if (actorsValid.length) {
            alert('Cette acteur existe déjà!')
            return
        }

        if (!actorData.photoName.length) {
            actorData.photo = avatarPlaceholder
        }
        if (actorData.name.length && actorData.character.length) {
            const actorDataCopy = actorData;
            delete actorDataCopy.photoName;
            setActorsList((oldArray) => [...oldArray, actorDataCopy])
            resetActorForm()
        } else {
            alert("Veuillez remplir tout les champs")
        }
    }
// HANDLE SIMILAR MOVIES FORM
    const handleMovieSubmit = (e) => {
        const moviesValid = moviesList.filter(item => item.name === movieData.name)
        if (moviesValid.length) {
            alert('Cette acteur existe déjà!')
            return
        }
        if (!movieData.posterName.length) {
            movieData.poster = posterPlaceholder
        }
        if (movieData.title.length && movieData.release_date.length) {
            const movieDataCopy = movieData;
            delete movieDataCopy.posterName;
            setMoviesList((oldArray) => [...oldArray, movieDataCopy])
            resetMovieForm()
        } else {
            alert("Veuillez remplir tout les champs")
        }
    }
    const handleUpload = (e, setProgress, type) => {
        let files;
        if (e.dataTransfer === undefined) {
            files = e.target.files;
        } else {
            files = e.dataTransfer.files;
        }
        e.preventDefault();
        e.stopPropagation();

        if (files && files.length > 0) {
            uploadImage(files[0], "images", setProgress).then((res) => {
                if (type === "actor") {

                    setActorData({
                        ...actorData,
                        photo: res.url,
                        photoName: res.name
                    })
                } else if (type === "movie") {
                    setMovieData({
                        ...movieData,
                        poster: res.url,
                        posterName: res.name
                    })
                } else {
                    setInputs({
                        ...inputs,
                        [`${type}`]: res.url,
                        [`${type}Name`]: res.name
                    })
                }
            });
            try {
                e.dataTransfer.clearData();
            } catch (error) {

            }
        }
    }
// HANDLE ACTOR FORM INPUTS CHANGE
    const handleActorChange = (e) => {
        setActorData({
            ...actorData,
            [e.target.name]: e.target.value
        })
    }
    const handleMovieChange = (e) => {
        setMovieData({
            ...movieData,
            [e.target.name]: e.target.value
        })
    }
    const handleInputsChange = (e) => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        })
    }

    const resetActorForm = () => {
        setActorForm(false);
        setActorData(defaultActorData);
    }
    const resetMovieForm = () => {
        setMovieForm(false);
        setMovieData(defaultMovieData);
    }

    return (
        <section className="movie-actions">
            <h1 className="page-title">Modifier un film de ma liste</h1>
            {/*ADD MOVIE FORM*/}
            {data && actorsList && moviesList && <form className="add-form" onSubmit={handleSubmit}>
                {/*TITLE + CATEGORIE INPUT GROUP*/}
                <div className="input-group">
                    <div className="input-wrapper">
                        <label>Titre*</label>
                        <input type="text"
                               className="form-input"
                               name="title"
                               onChange={handleInputsChange}
                               required={true}
                               value={inputs.title}/>
                    </div>
                    <div className="input-wrapper">
                        <label>Date de sortie</label>
                        <input type="date"
                               required={true}
                               name="release_date"
                               onChange={handleInputsChange}
                               value={inputs.release_date}/>
                    </div>
                </div>

                <div className="input-wrapper">
                    <div className="categorie-wrapper">

                    </div>
                    <CategorieInput categoriesList={allCategories} actualCategories={categoriesList}
                                    setCategories={setCategoriesList}/>
                </div>

                {/*DESCRIPTION INPUT*/}
                <div className="input-wrapper">
                    <label>Description*</label>
                    <textarea className="home-textarea" name="description" id="" cols="30" rows="10"
                              required={true}
                              onChange={handleInputsChange}
                              value={inputs.description}></textarea>
                </div>

                {/*POSTER + BACKDROP INPUT GROUP*/}
                <div className="input-group">
                    <div className="input-wrapper">
                        <label>Affiche</label>
                        <div className="upload-wrapper">
                            {posterProgress === 100
                                ? <>
                                    <p className="image-name">{inputs.posterName.length
                                        ? inputs.posterName
                                        : "Aucune image"
                                    }</p>
                                    <label htmlFor="fileinput-poster" className="icon-addfile"></label>
                                    <input
                                        onChange={(e) => handleUpload(e, setPosterProgress, "poster")}
                                        className="fileinput"
                                        type="file"
                                        name="image"
                                        id="fileinput-poster"
                                        accept=".jpg,.JPG,.jpeg,.JPEG,.png,.PNG,.gif,.GIF,.bmp,.BMP,.svg,.SVG,.webp,.WEBP"
                                    />
                                </>
                                : "Chargement..."}
                        </div>
                    </div>
                    <div className="input-wrapper">
                        <label>Arrière-plan</label>
                        <div className="upload-wrapper">
                            {backdropProgress === 100
                                ? <>
                                    <p className="image-name">{inputs.backdropName.length
                                        ? inputs.backdropName
                                        : "Aucune image"
                                    }</p>
                                    <label htmlFor="fileinput-backdrop" className="icon-addfile"></label>
                                    <input
                                        onChange={(e) => handleUpload(e, setBackdropProgress, "backdrop")}
                                        className="fileinput"
                                        type="file"
                                        name="image"
                                        id="fileinput-backdrop"
                                        accept=".jpg,.JPG,.jpeg,.JPEG,.png,.PNG,.gif,.GIF,.bmp,.BMP,.svg,.SVG,.webp,.WEBP"
                                    />
                                </>
                                : "Chargement..."}
                        </div>
                    </div>
                </div>

                <div className="input-wrapper ">
                    <label>Acteurs*</label>
                    <div className="tiles-wrapper">
                        {/*ACTOR ADD TILE*/}
                        <div className="add-tile">
                            <div className="add-tile-link"
                                 onClick={() => setActorForm(true)}>
                                <div className="add-tile-body">
                                    <p>+</p>
                                </div>
                            </div>
                            <div className={`add-tile-form ${actorForm ? "" : "disabled"}`}>
                                <div
                                    className={`close ${actorProgress != 100 ? "disabled" : ""}`}
                                    onClick={resetActorForm}>X
                                </div>
                                <div className="input-wrapper">
                                    <label>Nom</label>
                                    <input
                                        type="text"
                                        className="add-tile-input"
                                        placeholder="Ecrire ici..."
                                        name="name"
                                        value={actorData.name}
                                        onChange={handleActorChange}

                                    />
                                </div>
                                <div className="input-wrapper">
                                    <label>Rôle joué</label>
                                    <input
                                        type="text"
                                        className="add-tile-input"
                                        placeholder="Ecrire ici..."
                                        name="character"
                                        value={actorData.character}
                                        onChange={handleActorChange}

                                    />
                                </div>
                                <div className="input-wrapper">
                                    <label>Photo</label>
                                    <div className="upload-wrapper">
                                        {actorProgress === 100
                                            ? <>
                                                <p className="image-name">{actorData.photoName.length
                                                    ? actorData.photoName
                                                    : "Aucune image"
                                                }</p>
                                                <label htmlFor="fileinput" className="icon-addfile"></label>
                                                <input
                                                    onChange={(e) => handleUpload(e, setActorProgress, "actor")}
                                                    className="fileinput"
                                                    type="file"
                                                    name="photo"
                                                    id="fileinput"
                                                    accept=".jpg,.JPG,.jpeg,.JPEG,.png,.PNG,.gif,.GIF,.bmp,.BMP,.svg,.SVG,.webp,.WEBP"
                                                />
                                            </>
                                            : "Chargement..."}
                                    </div>

                                </div>
                                <input type="button" disabled={actorProgress == 100 ? false : true} value="valider"
                                       onClick={handleActorSubmit}/>
                            </div>
                        </div>
                        {/*ACTORS LIST*/}
                        <ul className="tiles-list">
                            {actorsList.map((actor, i) => (
                                <ActorTile key={i} index={i} name={actor.name} role={actor.character}
                                           image={actor.photo} setActors={setActorsList} actors={actorsList}/>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="input-wrapper ">
                    <label>Films Similaires*</label>
                    <div className="tiles-wrapper">
                        {/*SIMILAR MOVIES ADD TILE*/}
                        <div className="add-tile">
                            <div className="add-tile-link"
                                 onClick={() => setMovieForm(true)}>
                                <div className="add-tile-body">
                                    <p>+</p>
                                </div>
                            </div>
                            <div className={`add-tile-form ${movieForm ? "" : "disabled"}`}>
                                <div
                                    className={`close ${movieProgress != 100 ? "disabled" : ""}`}
                                    onClick={resetMovieForm}>X
                                </div>
                                <div className="input-wrapper">
                                    <label>Titre</label>
                                    <input
                                        type="text"
                                        className="add-tile-input"
                                        placeholder="Ecrire ici..."
                                        name="title"
                                        value={movieData.title}
                                        onChange={handleMovieChange}
                                    />
                                </div>
                                <div className="input-wrapper">
                                    <label>Date de sortie*</label>
                                    <input
                                        type="date"
                                        className="add-tile-input"
                                        placeholder="Ecrire ici..."
                                        name="release_date"
                                        value={movieData.release_date}
                                        onChange={handleMovieChange}

                                    />
                                </div>
                                <div className="input-wrapper">
                                    <label>Affiche</label>
                                    <div className="upload-wrapper">
                                        {movieProgress === 100
                                            ? <>
                                                <p className="image-name">{movieData.posterName.length
                                                    ? movieData.posterName
                                                    : "Aucune image"
                                                }</p>
                                                <label htmlFor="movieUpload" className="icon-addfile"></label>
                                                <input
                                                    onChange={(e) => handleUpload(e, setMovieProgress, "movie")}
                                                    className="fileinput"
                                                    type="file"
                                                    name="poster"
                                                    id="movieUpload"
                                                    accept=".jpg,.JPG,.jpeg,.JPEG,.png,.PNG,.gif,.GIF,.bmp,.BMP,.svg,.SVG,.webp,.WEBP"
                                                />
                                            </>
                                            : "Chargement..."}
                                    </div>

                                </div>
                                <input type="button" disabled={movieProgress == 100 ? false : true} value="valider"
                                       onClick={handleMovieSubmit}/>
                            </div>
                        </div>
                        {/*Movies LIST*/}
                        <ul className="tiles-list">
                            {moviesList.map((movie, i) => (
                                <SimMovieTile key={i} index={i} title={movie.title} date={movie.release_date}
                                              poster={movie.poster} setMovies={setMoviesList} movies={moviesList}/>
                            ))}
                        </ul>
                    </div>
                </div>
                <button type="submit">Modifier</button>
            </form>}
        </section>
    )
}
export default MovieEdit;