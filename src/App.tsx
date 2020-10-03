import React from "react";
import { CSSReset, ThemeProvider, theme } from "@chakra-ui/core";
import LoginWrapper from "./components/Login";
import { UserContextProvider } from "./services/UserContext";

const App: React.FC = () => {
  return (
    <UserContextProvider>
      <ThemeProvider theme={theme}>
        <CSSReset />
        <LoginWrapper>halo</LoginWrapper>
      </ThemeProvider>
    </UserContextProvider>
  );
};

export default App;
