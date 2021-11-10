import './MovieAdd.scss'
import React, {useState} from 'react';
import {uploadImage, addMovie} from "../../utils/crud";
import ActorTile from "./ActorTile";
import SimMovieTile from "./SimMovieTile";
import {Autocomplete, TextField} from "@mui/material";
import CategorieInput from "../../components/CategorieInput/CategorieInput";

const MoviesAdd = () => {
    const defaultActorData = {
        name: "",
        image: "",
        imageName: "",
        character: ""
    }
    const defaultMovieData = {
        title: "",
        poster: "",
        posterName: "",
        character: ""
    }
    const [inputs, setInputs] = useState({
        title: "",
        description: "",
        poster: "",
        backdrop: "",
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

    const [actorsList, setActorsList] = useState([])

    const [moviesList, setMoviesList] = useState([])

    const [categoriesList, setCategoriesList] = useState([])

    // HANDLE ADD MOVIE SUBMIT
    const handleSubmit = (e) => {
        e.preventDefault()
        const data = inputs
        delete data.posterName
        delete data.backdropName
        data.actors = actorsList
        data.similar_movies = moviesList
        data.categories = categoriesList
        if (
            data.actors.length &&
            data.categories.length &&
            data.title.length &&
            data.description.length &&
            data.release_date.length &&
            data.similar_movies.length
        ) {
            addMovie({...data})
        } else {
            alert("Veuillez remplir tout les champs")
        }
        // console.log({...data})
        // alert('Le film à bien été ajouté !')
        // window.location.href = "/"
    }

    // HANDLE ACTOR FORM
    const handleActorSubmit = (e) => {
        const actorsValid = actorsList.filter(item => item.name === actorData.name)
        if (actorsValid.length) {
            alert('Cette acteur existe déjà!')
            return
        }
        if (actorData.name.length && actorData.character.length && actorData.imageName.length) {
            const actorDataCopy = actorData;
            delete actorDataCopy.imageName;
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
        if (movieData.title.length && movieData.release_date.length && movieData.posterName.length) {
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
                        image: res.url,
                        imageName: res.name
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
        <section className="movie-add">
            <h1 className="page-title">Ajouter un film à ma liste</h1>

            {/*ADD MOVIE FORM*/}
            <form className="add-form" onSubmit={handleSubmit}>
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
                    <CategorieInput categoriesList={["Horreur", "Comedie", "Fantaisie"]}
                                    setCategories={setCategoriesList}/>
                </div>

                {/*DESCRIPTION INPUT*/}
                <div className="input-wrapper">
                    <label>Description</label>
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
                    <label>Acteurs</label>
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
                                   onClick={resetActorForm}>X</div>
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
                                                <p className="image-name">{actorData.imageName.length
                                                    ? actorData.imageName
                                                    : "Aucune image"
                                                }</p>
                                                <label htmlFor="fileinput" className="icon-addfile"></label>
                                                <input
                                                    onChange={(e) => handleUpload(e, setActorProgress, "actor")}
                                                    className="fileinput"
                                                    type="file"
                                                    name="image"
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
                                           image={actor.image} setActors={setActorsList} actors={actorsList}/>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="input-wrapper ">
                    <label>Films Similaires</label>
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
                                   onClick={resetMovieForm}>X</div>
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
                                    <label>Date de sortie</label>
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
                <button type="submit">Ajouter</button>
            </form>
        </section>
    )
}
export default MoviesAdd;