import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios, { AxiosError, AxiosResponse } from "axios";
import {
  FormControl,
  Input,
  Button,
  FormLabel,
  Divider,
  Heading,
  Box,
  FormErrorMessage,
  Spinner,
  useToast,
} from "@chakra-ui/core";
import { Link, useHistory } from "react-router-dom";

// Enlace del server backend, guardado en las variables de entorno.
const localapi = process.env.REACT_APP_ROOT_API;
// Enlace de registro de usuarios
const registerUri = `${localapi}users/`;

// Formulario de registro de usuarios, se encarga de enviar credenciales al server para ser almacenadas
const RegisterForm: React.FC = () => {
  const history = useHistory();

  const toast = useToast();

  const {
    register,
    handleSubmit,
    errors,
    formState,
    setError,
    clearErrors,
  } = useForm();

  const [isFormLoading, setFormLoadingState] = useState(false);

  // Peticion al server, si no hay error redirecciona a la pagina login (/keys)
  const onSubmit = handleSubmit(
    ({ email, emailconfirm, passwordconfirm, password }) => {
      clearErrors();
      if (email !== emailconfirm) {
        setError("email", { message: "Los campos de email no coinciden." });
      }
      if (password !== passwordconfirm) {
        setError("password", {
          message: "Los campos de contraseña no coinciden.",
        });
      }
      setFormLoadingState(true);
      axios
        .request({
          url: registerUri,
          method: "POST",
          data: { email, password },
        })
        .then((res: AxiosResponse) => {
          toast({
            title: "Cuenta creada!",
            description: "Probá iniciar sesión.",
            status: "success",
            duration: 9000,
            isClosable: true,
          });
          history.replace("/keys");
        })
        .catch((err: AxiosError) => {
          setError("email", {
            message: "Este email ya está en uso.",
          });
          setFormLoadingState(false);
          // eslint-disable-next-line no-console
          console.log(err);
        });
    }
  );
  return (
    <Box>
      <Box textAlign="center">
        <Heading as="h3">Registrarse</Heading>
      </Box>
      <Divider />
      <form onSubmit={onSubmit}>
        <FormControl isInvalid={errors.email || errors.password}>
          {errors && errors.email && (
            <FormErrorMessage>{errors.email.message}</FormErrorMessage>
          )}
          {errors && errors.password && (
            <FormErrorMessage>{errors.password.message}</FormErrorMessage>
          )}
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input
            type="email"
            name="email"
            ref={register({
              required: "Falta completar datos de email.",
            })}
          />
          <FormLabel htmlFor="emailconfirm">Confirmar Email</FormLabel>
          <Input
            type="email"
            name="emailconfirm"
            ref={register({
              required: "Falta completar datos de email.",
            })}
          />
          <FormLabel htmlFor="password">Contraseña</FormLabel>
          <Input
            type="password"
            name="password"
            ref={register({
              required: "Falta completar datos de contraseña.",
            })}
          />
          <FormLabel htmlFor="passwordconfirm">Confirmar Contraseña</FormLabel>
          <Input
            type="password"
            name="passwordconfirm"
            ref={register({
              required: "Falta completar datos de contraseña.",
            })}
          />
          <Box
            mt={4}
            width="100%"
            display="flex"
            flexDirection="row-reverse"
            justifyContent="space-between"
            alignItems="center"
          >
            <Button
              variantColor="teal"
              isLoading={formState.isSubmitting}
              type="submit"
            >
              {isFormLoading ? <Spinner size="md" /> : "Enviar"}
            </Button>
            <Button variant="link" variantColor="teal">
              <Link to="/keys">Iniciar Sesión</Link>
            </Button>
          </Box>
        </FormControl>
      </form>
    </Box>
  );
};

export default RegisterForm;
