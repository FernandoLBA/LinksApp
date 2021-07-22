import firebase from 'firebase/app';
import 'firebase/firestore';

// Esto viene de la consola de Firebase
// Your web app's Firebase configuration
var firebaseConfig = {
     apiKey: "AIzaSyDP89GXwSwr-h-_O6VFyFeK7v_sNZCwNNw",
     authDomain: "fb-crud-react-637e0.firebaseapp.com",
     projectId: "fb-crud-react-637e0",
     storageBucket: "fb-crud-react-637e0.appspot.com",
     messagingSenderId: "235354215099",
     appId: "1:235354215099:web:ed9fcf835492ca22540f9e"
   };
// Initialize Firebase
const fb = firebase.initializeApp(firebaseConfig);

// Lo usamos para manejar la base de datos
export const db = fb.firestore();
