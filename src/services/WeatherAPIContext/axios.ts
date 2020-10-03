import axios, { AxiosError, AxiosResponse } from "axios";
import { WeatherAPIError, WeatherDataModel } from "./types";

// saco la url y las keys del entorno

const weatherApiUrl =
  process.env.REACT_APP_WEATHER_API ||
  "http://api.openweathermap.org/data/2.5/weather";

const weatherAPIKey = process.env.REACT_APP_WEATHER_API_KEY;

const weatherAPILang = process.env.REACT_APP_WEATHER_API_LANG;

// función factory que toma callbacks como argumentos, para ser llamados en la promesa de axios

// eslint-disable-next-line import/prefer-default-export
export const getWeatherFactory = (
  errorSetter: (error: WeatherAPIError | null) => void,
  loadingSetter: (isLoading: boolean) => void,
  weatherDataSetter: (weatherData: WeatherDataModel) => void
) => (city: string): void => {
  loadingSetter(true);
  axios
    .get(weatherApiUrl, {
      params: { q: city, appid: weatherAPIKey, lang: weatherAPILang },
    })
    .then((res: AxiosResponse<WeatherDataModel>) => {
      weatherDataSetter(res.data);
      errorSetter(null);
    })
    .catch((err: AxiosError<WeatherAPIError>) => {
      if (err.response) {
        errorSetter(err.response.data);
      }
    })
    .finally(() => loadingSetter(false));
};
