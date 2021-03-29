// import firebase
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/functions";

// import React hooks
import { createContext, useContext, useEffect, useState } from "react";

//set up firebase config (should not store this in your file. use environmental variables)
var firebaseConfig = {
  apiKey: "AIzaSyB2LSXqz7FalAczP9ZZ8MwUF1LiujUEQQo",
  authDomain: "auth-demo-11ec9.firebaseapp.com",
  projectId: "auth-demo-11ec9",
  storageBucket: "auth-demo-11ec9.appspot.com",
  messagingSenderId: "70476490605",
  appId: "1:70476490605:web:126bfecbc7865039e2dc64",
};

// check if there are firebase apps initialized
// if not, create one.
if (firebase.apps.length == 0) {
  firebase.initializeApp(firebaseConfig);
}

// create react context to be used throughout the app
const AuthContext = createContext(null);

// HOC component to provide auth data (AuthContext)
export function AuthProvider({ children }) {
  const val = useProvideAuth();
  if (val.authState.state === "loading") {
    return <>Loading...</>;
  }
  return <AuthContext.Provider value={val}>{children}</AuthContext.Provider>;
}

// auth hook that provides access to most current auth data
export default function useAuth() {
  // return useContext(AuthContext);
  return useProvideAuth();
}

const setupAdmin = firebase.functions().httpsCallable("setupAdmin");
// auth state object
function useProvideAuth() {
  // user stores firebase.auth.User object
  const [user, setUser] = useState(null);
  const [authState, setAuthState] = useState({ state: "loading", token: null });

  const signin = (email, password) => {
    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(({ user }) => {
        setUser(user);
      })
      .catch((err) => {
        // alert(err.message);
        throw new Error(err.message);
      });
  };
  const signup = (email, password, code) => {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(({ user }) => {
        setUser(user);
        if (code == "admin") {
          setupAdmin({ code, uid: user.uid }).then(() => {
            user.getIdToken(true);
          });
        }
      })
      .catch((err) => {
        // alert(err.message);
        throw new Error(err.message);
      });
  };
  const signout = () => {
    return firebase
      .auth()
      .signOut()
      .then(() => {
        setUser(null);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  //cleans up on component unmount
  useEffect(() => {
    const cleanup = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        let token = user.getIdTokenResult(true);
        setAuthState({ state: "in", token });
        setUser(user);
      } else {
        setUser(null);
        setAuthState({ state: "out", token: null });
      }
    });

    return () => cleanup();
  }, []);

  return {
    signin,
    signup,
    signout,
    user,
    authState,
  };
}
