import {storageRef} from "./firebase";
import axios from "axios";

const API = "http://localhost:3001"

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