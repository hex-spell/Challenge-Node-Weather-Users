import React from "react";
import { CSSReset, ThemeProvider, theme } from "@chakra-ui/core";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import LoginWrapper from "./components/Login";
import { UserContextProvider } from "./services/UserContext";
import Register from "./components/Register";
import ApiDocs from "./components/ApiDocs";
import Navbar from "./components/Navbar";
import MyKeys from "./components/MyKeys";

const App: React.FC = () => {
  return (
    <UserContextProvider>
      <ThemeProvider theme={theme}>
        <CSSReset />
        <Router>
          <Navbar />
          <Switch>
            <Route exact path="/">
              <ApiDocs />
            </Route>
            <Route path="/keys">
              <LoginWrapper>
                <MyKeys />
              </LoginWrapper>
            </Route>
            <Route path="/register">
              <Register />
            </Route>
          </Switch>
        </Router>
      </ThemeProvider>
    </UserContextProvider>
  );
};

export default App;
