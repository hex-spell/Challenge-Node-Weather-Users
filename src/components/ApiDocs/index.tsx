import React from "react";
import { Text, Heading, Divider, Box, Code } from "@chakra-ui/core";
import { Link } from "react-router-dom";
import { Container } from "../Layout";

const ApiDocs: React.FC = () => {
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
        Puede llamar por nombre de ciudad. Vas a necesitar una api key para
        hacer esta petición, para obtener una debes ir al panel de{" "}
        <Link to="/keys" style={{ color: "teal", fontWeight: "bold" }}>
          Mis Llaves
        </Link>
      </Text>
      <Divider opacity={0} />
      <Box display="flex" flexWrap="wrap">
        <Code>{"https://node-weather-challenge.herokuapp.com/weather?q="}</Code>
        <Code variantColor="orange">{"{Nombre de ciudad}"}</Code>
        <Code>{"&appid="}</Code>
        <Code variantColor="orange">{"{API key}"}</Code>
      </Box>
    </Container>
  );
};

export default ApiDocs;
