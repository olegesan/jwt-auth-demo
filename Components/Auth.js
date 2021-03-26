import { useForm } from "react-hook-form";
import {
  Input,
  Heading,
  Text,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Button,
  Container,
  Box,
} from "@chakra-ui/react";
import { useState } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import StyleFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import auth from "../utils/auth";

export default function Auth(props) {
  const [kind, setKind] = useState(props.kind);

  const { handleSubmit, register } = useForm();

  const onSubmit = (data) => {
    const { displayName, email, password } = data;
  };

  const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: "popup",
    // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
    signInSuccessUrl: "/",
    // We will display Google and Facebook as auth providers.
    signInOptions: [
      firebase.auth.GithubAuthProvider.PROVIDER_ID,
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    ],
  };
  return (
    <Container centerContent>
      <Box>
        <Heading size="lg" mb="5">
          {kind == "signin" ? "Sign In" : "Sign Up"}
        </Heading>
        <form onSubmit={handleSubmit(onSubmit)}>
          {kind == "signup" ? (
            <>
              <FormControl>
                <FormLabel>User Name</FormLabel>
                <Input name="displayName" ref={register} />
              </FormControl>
              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input name="email" ref={register} />
              </FormControl>
              <FormControl>
                <FormLabel>Password</FormLabel>
                <Input name="password" ref={register} />
              </FormControl>
            </>
          ) : (
            <>
              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input name="email" ref={register} />
              </FormControl>
              <FormControl>
                <FormLabel>Password</FormLabel>
                <Input name="password" ref={register} />
              </FormControl>
            </>
          )}
          <FormControl>
            <Button mt="5" w="100%">
              {kind == "signin" ? "Sign In" : "Sign Up"}
            </Button>
          </FormControl>
        </form>
      </Box>
      <Text centerContent mt="5">
        {" "}
        Or{" "}
      </Text>
      <StyleFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
    </Container>
  );
}
