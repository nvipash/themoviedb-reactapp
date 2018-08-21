import * as firebase from "firebase/app";
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyAY-GmwOAmShWT1LMkA9ubTQKRQEc6R8Fk",
    authDomain: "themoviedb-reactapp.firebaseapp.com",
    databaseURL: "https://themoviedb-reactapp.firebaseio.com",
    projectId: "themoviedb-reactapp",
    storageBucket: "themoviedb-reactapp.appspot.com",
    messagingSenderId: "526113630516"
};
firebase.initializeApp(config);

export const auth = firebase.auth();