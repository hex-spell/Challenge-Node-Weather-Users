import { IWeatherContextStore, WeatherDataModel } from "./types";

export const initialWeatherState: WeatherDataModel = {
  coord: {
    lon: 0,
    lat: 0,
  },
  weather: [
    {
      id: 0,
      main: "",
      description: "",
      icon: "",
    },
  ],
  base: "",
  main: {
    temp: 0,
    feels_like: 0,
    temp_min: 0,
    temp_max: 0,
    pressure: 0,
    humidity: 0,
  },
  visibility: 0,
  wind: {
    speed: 0,
    deg: 0,
    gust: 0,
  },
  clouds: {
    all: 0,
  },
  dt: 0,
  sys: {
    type: 0,
    id: 0,
    country: "",
    sunrise: 0,
    sunset: 0,
  },
  timezone: 0,
  id: 0,
  name: "",
  cod: 0,
};

export const initialWeatherAPIState: IWeatherContextStore = {
  weatherData: initialWeatherState,
  isLoading: false,
  error: null,
  setSearchCity: (city) => {
    throw new Error(
      `Has buscado ${city}, pero el hook de estado 'setSearchCity' no ha sido instanciado`
    );
  },
};
