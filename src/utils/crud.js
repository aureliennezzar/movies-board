import {storageRef} from "./firebase";
import axios from "axios";

export const uploadImage = (file, uid, setProgress) => {
    return new Promise(resolve => {
        const task = storageRef.child(`${uid}/${file.name}`).put(file)
        if (file !== undefined && file.type.split('/')[0] === "image") {
            task.on('state_changed',
                function progress(snap) {
                    let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
                    if (setProgress) setProgress(percentage.toFixed(0))
                }, function error(err) {
                    console.log("error",err)
                }, function complete() {
                    if (setProgress) setProgress(100)
                }
            )
            task.then(function (snap) {
                const { name } = snap.ref
                snap.ref.getDownloadURL().then((url) => {
                    resolve({ name, url });
                });
            })
        }
    })
}

export const addMovie = (data)=>{
    axios.post('http://localhost:3000/movies', data, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}