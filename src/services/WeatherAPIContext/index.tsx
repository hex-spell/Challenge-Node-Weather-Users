import React, { createContext, useState, useEffect, useMemo } from "react";
import {
  WeatherDataModel,
  WeatherAPIError,
  IWeatherContextStore,
} from "./types";
import {
  initialWeatherAPIState,
  initialWeatherState,
} from "./initialWeatherState";
import { getWeatherFactory } from "./axios";

export const WeatherAPIContext = createContext<IWeatherContextStore>(
  initialWeatherAPIState
);

// desde acá defino la ciudad que se carga al iniciar la app, hasta que ponga la api de geolocalización
const initialCity = "buenos aires";

// esto es un context que obtiene datos de la api de clima de openweather
// decidí usar un par de useStates en vez de useReducer porque en este caso la app es simple y ocupa menos espacio,
// de esta forma tiene menos boilerplate
const WeatherAPIContextProvider: React.FC = ({ children }) => {
  const [weatherData, setWeatherData] = useState<WeatherDataModel>(
    initialWeatherState
  );

  const [isLoading, setLoadingState] = useState(true);

  const [error, setError] = useState<WeatherAPIError | null>(null);

  // este es el estado del formulario de busqueda, lo pongo acá para poder usar el useEffect
  const [searchCity, setSearchCity] = useState(initialCity);

  // se ejecuta al primer render y actualiza los datos cada vez que cambia el valor del formulario de busqueda
  useEffect(() => {
    const getWeather = getWeatherFactory(
      setError,
      setLoadingState,
      setWeatherData
    );
    // llamado a la api de openweather con axios, maneja el estado de cargando y de errores tambien, aprovechando la api de promesas
    getWeather(searchCity);
  }, [searchCity]);

  // uso useMemo para no reinstanciar weatherData en cada render
  // como este componente tiene funcionalidades asíncronas, se va a renderizar incluso cuando no hayan nuevos datos
  const store = useMemo(
    () => ({
      weatherData,
      isLoading,
      error,
      setSearchCity,
    }),
    [error, isLoading, weatherData, setSearchCity]
  );

  return (
    <WeatherAPIContext.Provider value={store}>
      {children}
    </WeatherAPIContext.Provider>
  );
};

export default WeatherAPIContextProvider;
