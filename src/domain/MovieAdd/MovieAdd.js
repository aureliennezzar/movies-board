import './MovieAdd.scss'
import React, {useState} from 'react';
import uploadImage from "../../utils/crud";

const MoviesAdd = () => {
    const defaultActorData = {
        name: "",
        image: "",
        imageName:"",
        character: ""
    }
    const [inputs, setInputs] = useState({});
    const [actorForm, setActorForm] = useState(false);
    const [actorData, setActorData] = useState(defaultActorData);
    const [actorList, setActorList] = useState([])

    // HANDLE ADD MOVIE SUBMIT
    const handleSubmit = (e) => {
        e.preventDefault()

    }
    // HANDLE ACTOR FORM
    const handleActorSubmit = (e) => {

    }
    const handleUpload = (e) => {
        let files;
        if (e.dataTransfer === undefined) {
            files = e.target.files;
        } else {
            files = e.dataTransfer.files;
        }
        e.preventDefault();
        e.stopPropagation();

        if (files && files.length > 0) {
            uploadImage(files[0], "images").then((res) => {
                console.log("upload")
                setActorData({
                    ...actorData,
                    image: res.url
                })
                console.log(res.url)
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
    return (
        <section className="movie-add">
            <h1 className="page-title">Ajouter un film à ma liste</h1>

            {/*ADD MOVIE FORM*/}
            <form className="add-form" onSubmit={handleSubmit}>
                {/*TITLE + CATEGORIE INPUT GROUP*/}
                <div className="input-group">
                    <div className="input-wrapper">
                        <label>Titre</label>
                        <input type="text" className="form-input"/>
                    </div>
                    <div className="input-wrapper">
                        <label>Catégorie</label>
                        <select className="home-input home-select-input" name="" id="">
                            <option>Catégorie</option>
                            <option>Action</option>
                            <option>Action</option>
                        </select>
                    </div>
                </div>

                {/*DESCRIPTION INPUT*/}
                <div className="input-wrapper">
                    <label>Description</label>
                    <textarea className="home-textarea" name="" id="" cols="30" rows="10"></textarea>
                </div>

                {/*POSTER + BACKDROP INPUT GROUP*/}
                <div className="input-group">
                    <div className="input-wrapper">
                        <label>Affiche</label>
                        <input type="text" className="form-input"/>
                    </div>
                    <div className="input-wrapper">
                        <label>Arrière-plan</label>
                        <input type="text" className="form-input"/>
                    </div>
                </div>

                <div className="input-group">


                    <div className="input-wrapper">
                        <label>Acteurs</label>
                        <div className="add-actor">
                            <a href={"javascript:void"} className="add-actor-link" onClick={() => setActorForm(true)}>
                                <div className="add-actor-body">
                                    <p>+</p>
                                </div>
                            </a>
                            <div className={`add-actor-form ${actorForm ? "" : "disabled"}`}>
                                <a href={"javascript:void"} className="close" onClick={() => setActorForm(false)}>X</a>

                                <div className="input-wrapper">
                                    <label>Nom</label>
                                    <input
                                        type="text"
                                        className="add-actor-input"
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
                                        className="add-actor-input"
                                        placeholder="Ecrire ici..."
                                        name="character"
                                        value={actorData.character}
                                        onChange={handleActorChange}

                                    />
                                </div>
                                <div className="input-wrapper">
                                    <label>Photo</label>
                                    <input
                                        onChange={(e) => handleUpload(e)}
                                        type="file"
                                        name="image"
                                        accept=".jpg,.JPG,.jpeg,.JPEG,.png,.PNG,.gif,.GIF,.bmp,.BMP,.svg,.SVG,.webp,.WEBP"
                                    />
                                </div>
                                <input type="button" value="valider" onClick={handleActorSubmit}/>
                            </div>
                        </div>
                    </div>
                </div>

                <button type="submit">Ajouter</button>
            </form>
        </section>
    )
}
export default MoviesAdd;