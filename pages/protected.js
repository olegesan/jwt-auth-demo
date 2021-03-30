import WithProtectedPath from "../Components/WithProtectedPath";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { Heading, Text, Container } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import Characters from "../Components/Characters";
import AddCharacter from "../Components/AddCharacter";

import {
  getCollectionData,
  getStreamedCollectionData,
} from "../utils/firebase_utils";

function AuthenticationRequired() {
  const [collection, setCollection] = useState("black_clover_characters");
  const [data, setData] = useState([]);

  useEffect(() => {
    const unsubscribe = getStreamedCollectionData(collection, {
      next: (querySnapshot) => {
        const chars = querySnapshot.docs.map((char) => char.data());
        setData(chars);
      },
      error: (err) => {
        console.log(err);
      },
    });
    return unsubscribe;
  }, [collection]);

  return (
    <Container minW="90%">
      <Heading> Hello World, this is what is being protected </Heading>
      <AddCharacter />
      {/* {data.map((char, idx) => {
        return <Text key={idx}>{char.name}</Text>;
      })} */}
      <Characters data={data} />
    </Container>
  );
}

export default WithProtectedPath(AuthenticationRequired);
