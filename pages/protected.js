import WithProtectedPath from "../Components/WithProtectedPath";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { Heading, Text } from "@chakra-ui/react";
import { useState, useEffect } from "react";

const db = firebase.firestore(firebase.apps[0]);
function AuthenticationRequired() {
  //   const [characters, setCharacters] = useState([]);
  const [collection, setCollection] = useState("black_clover_characters");
  //   const [data, setData] = useState([]);
  //   const docRef = db.collection(collection);
  //     useEffect(()=>{
  //         docRef.get().then((querySnapshot)=>setData(querySnapshot.docs()))
  //     }, [collection])
  return (
    <>
      <Heading> Hello World, this is what is being protected </Heading>
      {}
    </>
  );
}

export default WithProtectedPath(AuthenticationRequired);
