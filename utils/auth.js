// import firebase
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/functions";

// import React hooks
import { createContext, useContext, useEffect, useState } from "react";

//set up firebase config (should not store this in your file. use environmental variables)
//I had to start my env vars with NEXT_PUBLIC_ but if you don't use next.js
// most likely you won't have to
var firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
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
