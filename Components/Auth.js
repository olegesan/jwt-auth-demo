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
import useAuth from "../utils/auth";
import { useRouter } from "next/router";

export default function Auth(props) {
  const [kind, setKind] = useState(props.kind);
  const [error, setError] = useState("");
  const auth = useAuth();
  const router = useRouter();

  const { handleSubmit, register } = useForm();

  // handles form submit that passes data object with help of react-hook-form
  // provides {email, displayName, password} based on the fields of the form
  const onSubmit = (data) => {
    const { code, email, password } = data;
    if (kind == "signin") {
      auth
        .signin(email, password)
        .then(() => {
          router.push("/");
        })
        .catch((err) => {
          setError(err.message);
        });
    }
    if (kind == "signup") {
      auth
        .signup(email, password, code)
        .then(() => {
          router.push("/");
        })
        .catch((err) => {
          setError(err.message);
        });
    }
  };

  const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: "popup",
    // We will display Google and Github as auth providers.
    signInOptions: [
      firebase.auth.GithubAuthProvider.PROVIDER_ID,
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      // uponsuccessfull signin takes user to home page
      signInSuccessWithAuthResult: () => router.push("/"),
    },
  };

  return (
    <Container centerContent>
      <Box w="50%">
        <Heading size="lg" mb="5">
          {kind == "signin" ? "Sign In" : "Sign Up"}
        </Heading>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* based on kind prop render appropriate fields */}
          {kind == "signup" ? (
            <>
              <FormControl>
                <FormLabel>Code</FormLabel>
                <Input name="code" type="password " ref={register} />
              </FormControl>
              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input name="email" type="email" ref={register} />
              </FormControl>
              <FormControl>
                <FormLabel>Password</FormLabel>
                <Input name="password" type="password" ref={register} />
              </FormControl>
            </>
          ) : (
            <>
              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input name="email" type="email" ref={register} />
              </FormControl>
              <FormControl>
                <FormLabel>Password</FormLabel>
                <Input name="password" type="password" ref={register} />
              </FormControl>
            </>
          )}
          {/* display error, if any */}
          <FormControl isInvalid={error}>
            <FormErrorMessage> {error}</FormErrorMessage>
          </FormControl>
          <FormControl>
            <Button mt="5" w="100%" type="submit">
              {kind == "signin" ? "Sign In" : "Sign Up"}
            </Button>
          </FormControl>
        </form>
      </Box>
      <Text centerContent mt="5">
        Or
      </Text>
      <StyleFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
    </Container>
  );
}
