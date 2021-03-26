import { Flex, Box, Button, Spacer, Text } from "@chakra-ui/react";
import Link from "next/link";

export default function Navbar() {
  return (
    <Flex flexFlow="row" justifyContent="space-around" m="5">
      <Link href="/">JWT Auth Demo</Link>
      <Spacer />
      <Flex minW="md" flexFlow="row" justifyContent="space-around">
        <Button>
          <Link href="/signin">Sign In</Link>
        </Button>
        <Button>
          <Link href="/signup">Sign Up</Link>
        </Button>
        <Button> Sign Out </Button>
      </Flex>
    </Flex>
  );
}
