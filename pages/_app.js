// import '../styles/globals.css'
import Navbar from "../Components/Navbar";
import { ChakraProvider, Container } from "@chakra-ui/react";
import { AuthProvider } from "../utils/auth";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <ChakraProvider>
        <AuthProvider>
          <Navbar />
          <Component {...pageProps} />
        </AuthProvider>
      </ChakraProvider>
    </>
  );
}

export default MyApp;
