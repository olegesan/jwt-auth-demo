// import '../styles/globals.css'
import Navbar from "../Components/Navbar";
import { ChakraProvider, Container } from "@chakra-ui/react";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <ChakraProvider>
        <Navbar />
        <Component {...pageProps} />
      </ChakraProvider>
    </>
  );
}

export default MyApp;
