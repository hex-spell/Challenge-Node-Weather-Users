import React, { useContext } from "react";
import { Button, Flex } from "@chakra-ui/core";
import { Link } from "react-router-dom";
import { Container } from "../Layout";
import { LOG_OUT, UserContext } from "../../services/UserContext";

const Navbar: React.FC = () => {
  const {
    store: {
      user: { email },
    },
    dispatch,
  } = useContext(UserContext);
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      bg="teal.500"
      color="white"
      position="sticky"
      top={0}
      left={0}
      width="100%"
      zIndex={3}
    >
      <Container display="flex" justifyContent="right">
        <Button variant="link" m="15px" variantColor="white">
          <Link to="/">Docs</Link>
        </Button>
        <Button variant="link" m="15px" variantColor="white">
          <Link to="/keys">{email ? "Mis Llaves" : "Iniciar Sesión"}</Link>
        </Button>
        {email ? (
          <Button
            variant="link"
            m="15px"
            variantColor="white"
            onClick={() => dispatch({ type: LOG_OUT, payload: null })}
          >
            Cerrar Sesión
          </Button>
        ) : (
          <Button variant="link" m="15px" variantColor="white">
            <Link to="/register">Registrarse</Link>
          </Button>
        )}
      </Container>
    </Flex>
  );
};

export default Navbar;
