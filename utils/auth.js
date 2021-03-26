import firebase from "firebase/app";
import "firebase/auth";
// import { auth } from "firebaseui";
import { createContext, useContext, useEffect, useState } from "react";
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

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const val = useProvideAuth();
  return <AuthContext.Provider value={val}>{children}</AuthContext.Provider>;
}

export default function useAuth() {
  return useContext(AuthContext);
}

function useProvideAuth() {
  const [user, setUser] = useState(null);
  const [authState, setAuthState] = useState({ state: "out", token: null });
  const signin = (email, password) => {
    return firebase
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .then(() => {
        firebase
          .auth()
          .signInWithEmailAndPassword(email, password)
          .then(({ user }) => {
            setUser(user);
          })
          .catch((err) => {
            alert(err.message);
          });
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  const signup = (email, password) => {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(({ user }) => {
        setUser(user);
      })
      .catch((err) => {
        alert(err.message);
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

  useEffect(async () => {
    if (user) {
      let token = await user.getIdTokenResult(true);
      setAuthState({ state: "in", token });
    } else {
      setAuthState({ state: "out", token: null });
    }
  }, [user]);
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  });

  return {
    signin,
    signup,
    signout,
    user,
  };
}
