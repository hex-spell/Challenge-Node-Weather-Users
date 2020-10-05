import {
  Divider,
  Heading,
  List,
  ListItem,
  Button,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/core";
import React, { useContext } from "react";
import { useClipboard } from "use-clipboard-copy";
import { Container } from "../Layout";
import Key from "./Key";
import useApiKeys from "../../services/useApiKeys";
import { ApiKey } from "../../services/useApiKeys/types";
import { UserContext } from "../../services/UserContext";

const ApiDocs: React.FC = () => {
  const {
    store: { token },
  } = useContext(UserContext);
  const {
    isLoading,
    apiKeys,
    error,
    generateApiKey,
    deleteApiKey,
  } = useApiKeys(token);
  const toast = useToast();
  const clipboard = useClipboard();
  const copyToClipboard = (data: string) => {
    clipboard.copy(data);
    toast({
      title: "Llave copiada al portapapeles!",
      description: "A programar se ha dicho.",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
  };
  return (
    <Container p="20px" bg="white" rounded="md" my="5px">
      <Heading as="h1" size="xl">
        Mis Llaves
      </Heading>
      <Divider />
      <Heading as="h2" size="md">
        Con estas llaves, o keys, vas a tener acceso a la api, podes generar
        cuantas quieras y revocarlas en cualquier momento.
      </Heading>
      <Divider />
      <Button variantColor="teal" onClick={generateApiKey}>
        Generar una Nueva Llave
      </Button>
      <Divider opacity={0} />
      <Heading as="h3" size="sm">
        Llaves:
      </Heading>
      {isLoading && <Spinner size="lg" />}
      {!isLoading && !error && apiKeys && (
        <List as="ul">
          {apiKeys.map((key: ApiKey) => (
            <ListItem>
              <Key
                apiKey={key.key}
                onDeleteClick={() => deleteApiKey(key._id)}
                onCopyClick={() => copyToClipboard(key.key)}
              />
            </ListItem>
          ))}
        </List>
      )}
      {apiKeys && apiKeys.length === 0 && (
        <Text>
          Parece que no has generado ninguna llave... Apretá ese boton verde
          gigante!
        </Text>
      )}
    </Container>
  );
};

export default ApiDocs;
