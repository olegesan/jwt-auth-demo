import { Flex, Box, Button, Spacer, Text } from "@chakra-ui/react";
import Link from "next/link";
import useAuth from "../utils/auth";

export default function Navbar() {
  const auth = useAuth();

  auth?.user?.getIdTokenResult().then((result) => console.log(result.claims));

  return (
    <Flex flexFlow="row" justifyContent="space-around" m="5">
      <Link href="/">JWT Auth Demo</Link>
      <Text ml="5">{auth.user ? `Email: ${auth.user.email}` : ""}</Text>
      <Spacer />
      <Flex minW="md" flexFlow="row" justifyContent="space-around">
        {!auth.user ? (
          <>
            <Button>
              <Link href="/signin">Sign In</Link>
            </Button>
            <Button>
              <Link href="/signup">Sign Up</Link>
            </Button>
          </>
        ) : (
          <Button onClick={() => auth.signout()}> Sign Out </Button>
        )}
      </Flex>
    </Flex>
  );
}
