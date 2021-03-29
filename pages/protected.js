import WithProtectedPath from "../Components/WithProtectedPath";

function AuthenticationRequired() {
  return <>Hello World, this is what is being protected</>;
}

export default WithProtectedPath(AuthenticationRequired);
