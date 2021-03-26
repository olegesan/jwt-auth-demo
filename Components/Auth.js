import { useForm } from "react-hook-form";
import {
  Input,
  Text,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Container,
  Box,
} from "@chakra-ui/react";
import { useState } from "react";
export default function Auth(props) {
  const [kind, setKind] = useState(props.kind);

  const { handleSubmit, register } = useForm();

  const onSubmit = (data) => {
    const { displayName, email, password } = data;
  };
  console.log(props);
  return (
    <Container centerContent>
      <Box>
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
        </form>
      </Box>
    </Container>
  );
}
