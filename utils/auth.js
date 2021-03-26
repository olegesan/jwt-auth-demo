import firebase from "firebase/app";
var firebaseConfig = {
  apiKey: "AIzaSyB2LSXqz7FalAczP9ZZ8MwUF1LiujUEQQo",
  authDomain: "auth-demo-11ec9.firebaseapp.com",
  projectId: "auth-demo-11ec9",
  storageBucket: "auth-demo-11ec9.appspot.com",
  messagingSenderId: "70476490605",
  appId: "1:70476490605:web:126bfecbc7865039e2dc64",
};

if (firebase.apps.length == 0) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
