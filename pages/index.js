import Head from "next/head";
import styles from "../styles/Home.module.css";
import { Container, SimpleGrid, Heading, Text, Box } from "@chakra-ui/react";
import useAuth from "../utils/auth";

export default function Home() {
  const auth = useAuth();

  return (
    <Container maxW="container.xl" centerContent>
      <Heading as="h1">
        Welcome to Auth Demo Page for React with JWT and Firebase
      </Heading>
      <SimpleGrid columns={2} spacing={20}>
        <Box>
          <Text>Left column</Text>
        </Box>
        <Box>
          <Text>Right column</Text>
        </Box>
      </SimpleGrid>
    </Container>
  );
}
