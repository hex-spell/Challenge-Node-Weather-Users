import React from "react";
import {
  Text,
  Heading,
  Divider,
  Box,
  Code,
  useToast,
  IconButton,
} from "@chakra-ui/core";
import { Link } from "react-router-dom";
import { useClipboard } from "use-clipboard-copy";
import { Container } from "../Layout";

const ApiDocs: React.FC = () => {
  const clipboard = useClipboard();
  const toast = useToast();
  const copyToClipboard = (data: string) => {
    clipboard.copy(data);
    toast({
      title: "Endpoint copiado al portapapeles!",
      description: "No te olvides de cambiar todo lo rojo por tus datos.",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
  };
  return (
    <Container p="20px" bg="white" rounded="md" mt="5px">
      <Heading as="h1" size="xl">
        Datos meteorológicos al azar
      </Heading>
      <Divider />
      <Heading as="h2" size="md">
        Acceda a datos metereológicos simulados, de cualquier ciudad del mundo.
        Esta api es un clon de openweather que usa una base de datos de las
        ciudades del mundo con sus coordenadas, pero devuelve datos climáticos
        azarosos.
      </Heading>
      <Divider />
      <Heading as="h1" size="xl">
        Obtener datos metereológicos de una ciudad
      </Heading>
      <Divider opacity={0} />
      <Text>
        La consulta se hace por nombre de ciudad. Vas a necesitar una api key
        para hacer esta petición, para obtener una debes ir al panel de{" "}
        <Link to="/keys" style={{ color: "teal", fontWeight: "bold" }}>
          Mis Llaves
        </Link>
      </Text>
      <Divider opacity={0} />
      <Box display="flex" flexWrap="wrap">
        <Code>{"https://node-weather-challenge.herokuapp.com/weather?q="}</Code>
        <Code variantColor="red">{"Ciudad"}</Code>
        <Code>{"&appid="}</Code>
        <Code variantColor="red">{"API key"}</Code>
        <IconButton
          onClick={() =>
            copyToClipboard(
              "https://node-weather-challenge.herokuapp.com/weather?q=Ciudad&appid=API key"
            )
          }
          aria-label="delete api key"
          icon="copy"
          variant="ghost"
          variantColor="teal"
        />
      </Box>
    </Container>
  );
};

export default ApiDocs;
