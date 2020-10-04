import { Spinner } from "@chakra-ui/core";
import React, { useContext } from "react";
import { UserContext } from "../../services/UserContext";
import { ContainerCentered } from "../Layout";
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
    <ContainerCentered>
      <RegisterForm />
    </ContainerCentered>
  );
};

export default RegisterWrapper;
