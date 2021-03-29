import useAuth from "../utils/auth";
import React from "react";

function withProtectedPath(Path) {
  const WithProtectedPath = () => {
    const auth = useAuth();
    if (auth.authState.state == "out") {
      return "Access Denied";
    }
    return (
      <>
        <Path />
      </>
    );
  };
  return WithProtectedPath;
}

export default withProtectedPath;
