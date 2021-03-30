import {
  Text,
  Heading,
  Flex,
  Box,
  Container,
  Button,
  FormLabel,
  Input,
  FormControl,
  FormErrorMessage,
  Stack,
  Checkbox,
  useShortcut,
} from "@chakra-ui/react";
import { writeData, wrtieData } from "../utils/firebase_utils";
import { useForm } from "react-hook-form";
import useAuth from "../utils/auth";
import { useState } from "react";

export default function AddCharacter() {
  const { register, handleSubmit, reset } = useForm();
  const auth = useAuth();
  const admin = auth?.authState?.token?.claims?.admin;
  if (!admin) {
    return "";
  }

  const onSubmit = (data) => {
    const { name, mage, commoner } = data;
    writeData("black_clover_characters", name.replace(" ", ""), {
      name,
      mage,
      commoner,
    })
      .then((obj) => {
        console.log(obj);
        reset();
      })
      .catch((err) => console.log(err));
  };
  return (
    <Flex
      as="form"
      onSubmit={handleSubmit(onSubmit)}
      boxShadow="base"
      p="5"
      m="5"
      flexFlow={["column"]}
      alignContent="baseline"
      maxW="500px"
    >
      <FormControl mb="3">
        <FormLabel>Name</FormLabel>
        <Input type="text" name="name" ref={register} />
      </FormControl>
      <Stack mb="3">
        <Checkbox name="commoner" ref={register}>
          Commoner
        </Checkbox>
        <Checkbox name="mage" ref={register}>
          Mage
        </Checkbox>
      </Stack>

      <FormControl>
        <Button type="submit"> Add Character </Button>
      </FormControl>
    </Flex>
  );
}
