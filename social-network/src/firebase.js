import firebase from 'firebase'; 
import 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyDld8Yv1Ar88Gl16hMS5LWvXOrW9GsDaOQ",
    authDomain: "social-network-3dcab.firebaseapp.com",
    databaseURL: "https://social-network-3dcab.firebaseio.com",
    projectId: "social-network-3dcab",
    storageBucket: "social-network-3dcab.appspot.com",
    messagingSenderId: "197754425230",
    appId: "1:197754425230:web:effdfab7c03b009f099edf",
    measurementId: "G-9RQCHD9MHT"
};

firebase.initializeApp(firebaseConfig);

let db = firebase.firestore();
db.settings({timestampsInSnapshots:true});

export { db, firebase }
