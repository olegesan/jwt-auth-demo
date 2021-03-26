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
  const auth = useAuth();
  const router = useRouter();

  const { handleSubmit, register } = useForm();

  const onSubmit = (data) => {
    const { displayName, email, password } = data;
    if (kind == "signin") {
      auth.signin(email, password);
    }
  };

  const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: "popup",
    // We will display Google and Facebook as auth providers.
    signInOptions: [
      firebase.auth.GithubAuthProvider.PROVIDER_ID,
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      signInSuccessWithAuthResult: () => router.push("/"),
    },
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
                <Input name="displayName" type="text " ref={register} />
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
