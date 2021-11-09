
import firebase from 'firebase';
var firebaseConfig = {
    apiKey: "AIzaSyCRKpabhArcurZnIdhu6bqBvGlsojUxSjw",
    authDomain: "my-movies-list-23f59.firebaseapp.com",
    projectId: "my-movies-list-23f59",
    storageBucket: "my-movies-list-23f59.appspot.com",
    messagingSenderId: "128552396861",
    appId: "1:128552396861:web:c9c9f75c6c26e34bb2a254",
    measurementId: "G-5897JN2Q4L"
};
firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth;
export const db = firebase.firestore();
export const storage = firebase.storage()
export const storageRef = storage.ref()