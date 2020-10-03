import React, { useContext } from "react";
import { Spinner } from "@chakra-ui/core";
import LoginForm from "./LoginForm";
import { UserContext } from "../../services/UserContext";
import { ContainerCentered } from "../Layout";

// Wrapper del formulario Login, se encarga de guardar la informacion del usuario en la sesion, y renderizar condicionalmente la app.
const LoginWrapper: React.FC = ({ children }) => {
  const {
    store: {
      user: { email },
      isLoading,
    },
  } = useContext(UserContext);

  // Condicional : Esta cargando?
  // S: renderizar spinner,
  // N: usuario logueado?
  // S: renderizar app,
  // N: renderizar formulario de logueo

  if (isLoading)
    return (
      <ContainerCentered>
        <Spinner size="xl" />
      </ContainerCentered>
    );
  if (email) return <>{children}</>;
  return (
    <ContainerCentered>
      <LoginForm />
    </ContainerCentered>
  );
};

export default LoginWrapper;
