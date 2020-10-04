import { useEffect, useState, useCallback } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useToast } from "@chakra-ui/core";
import { ApiKey, WeatherAPIError } from "./types";

const localapi = process.env.REACT_APP_ROOT_API;
const apikeysUri = `${localapi}apikeys`;

const useApiKeys = (
  token: string
): {
  isLoading: boolean;
  error: WeatherAPIError | null;
  apiKeys: ApiKey[] | null;
  generateApiKey: () => void;
  deleteApiKey: (id: string) => void;
} => {
  const toast = useToast();

  const [isLoading, setLoadingState] = useState(false);

  const [error, setErrorState] = useState<WeatherAPIError | null>(null);

  const [apiKeys, setApiKeys] = useState<ApiKey[] | null>(null);

  const getApiKeys = useCallback(() => {
    setLoadingState(true);
    axios
      .get(apikeysUri, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res: AxiosResponse<ApiKey[]>) => {
        setApiKeys(res.data);
        setErrorState(null);
      })
      .catch((err: AxiosError<WeatherAPIError>) => {
        if (err.response) setErrorState(err.response.data);
      })
      .finally(() => setLoadingState(false));
  }, [token]);

  const generateApiKey = useCallback(() => {
    axios
      .request({
        method: "POST",
        url: apikeysUri,
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res: AxiosResponse<ApiKey>) =>
        toast({
          title: "Llave generada!",
          description: res.data.key,
          status: "success",
          duration: 3000,
          isClosable: true,
        })
      )
      .catch((err: AxiosError<WeatherAPIError>) => {
        if (err.response)
          toast({
            title: "Oops!",
            description:
              "Ha habido un error generando una llave. Intentalo mas tarde!",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
      })
      .finally(() => getApiKeys());
  }, [getApiKeys, toast, token]);

  const deleteApiKey = useCallback(
    (id: string) => {
      axios
        .delete(`${apikeysUri}/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res: AxiosResponse<ApiKey>) =>
          toast({
            title: "Llave eliminada",
            description: res.data.key,
            status: "info",
            duration: 3000,
            isClosable: true,
          })
        )
        .catch((err: AxiosError<WeatherAPIError>) => {
          if (err.response)
            toast({
              title: "Oops!",
              description:
                "Ha habido un error eliminando una llave. Intentalo mas tarde!",
              status: "error",
              duration: 3000,
              isClosable: true,
            });
        })
        .finally(() => getApiKeys());
    },
    [getApiKeys, toast, token]
  );

  useEffect(() => {
    getApiKeys();
  }, [getApiKeys]);

  useEffect(() => {
    if (error) {
      toast({
        title: "Oops!",
        description: "Ha habido un obteniendo tus llaves. Intentalo mas tarde!",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  }, [error, toast]);

  return { apiKeys, isLoading, error, generateApiKey, deleteApiKey };
};

export default useApiKeys;
