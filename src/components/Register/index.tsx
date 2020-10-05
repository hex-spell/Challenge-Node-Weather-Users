import { Spinner } from "@chakra-ui/core";
import React, { useContext } from "react";
import { UserContext } from "../../services/UserContext";
import { Container, ContainerCentered } from "../Layout";
import RegisterForm from "./RegisterForm";

// Wrapper del formulario Login, se encarga de guardar la informacion del usuario en la sesion, y renderizar condicionalmente la app.
const RegisterWrapper: React.FC = () => {
  const {
    store: {
      user: { email },
      isLoading,
    },
  } = useContext(UserContext);

  if (isLoading)
    return (
      <ContainerCentered>
        <Spinner size="xl" />
      </ContainerCentered>
    );
  if (email) return <></>;
  return (
    <Container p="20px" bg="white" rounded="md" mt="20px" maxW="400px">
      <RegisterForm />
    </Container>
  );
};

export default RegisterWrapper;
