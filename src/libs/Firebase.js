import firebase from 'firebase'

var config = {
    apiKey: "AIzaSyD1k90nZOp3su4ZZKrXBU6BN4IlxgC4jiU",
    authDomain: "to-do-list-9dd72.firebaseapp.com",
    databaseURL: "https://to-do-list-9dd72.firebaseio.com",
    projectId: "to-do-list-9dd72",
    storageBucket: "",
    messagingSenderId: "860248088872"
};

firebase.initializeApp(config);

export default firebase;