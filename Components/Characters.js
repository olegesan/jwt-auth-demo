import {
  Text,
  Heading,
  Flex,
  Box,
  Container,
  CloseButton,
} from "@chakra-ui/react";
import useAuth from "../utils/auth";
import { deleteData } from "../utils/firebase_utils";

export default function Characters({ data }) {
  if (!data) {
    return "";
  }
  const auth = useAuth();
  const admin = auth?.authState?.token?.claims?.admin;
  const handleDelete = (name) => {
    deleteData("black_clover_characters", name)
      .then((data = console.log(data)))
      .catch((err) => console.log(err));
  };
  const cards = data.map((char, idx) => {
    console.log(char);
    return (
      <Flex
        key={idx}
        minW="200px"
        minH="150px"
        boxShadow="base"
        p="5"
        m="5"
        flexFlow="column"
        justify="center"
        alignContent="end"
      >
        {admin ? (
          <CloseButton
            alignSelf="end"
            mt="-10"
            mr="-3"
            onClick={() => handleDelete(char.name)}
          />
        ) : (
          ""
        )}
        <Text>Name: {char.name}</Text>
        <Text>Mage: {char.mage ? "+" : "-"}</Text>
      </Flex>
    );
  });

  return (
    <>
      <Heading size="md">Black Clover Characters' Cards: </Heading>
      <Flex w="100%" justify="flex-start" wrap="wrap">
        {cards}
      </Flex>
    </>
  );
}
