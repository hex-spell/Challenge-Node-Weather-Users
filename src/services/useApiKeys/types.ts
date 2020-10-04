export type ApiKey = {
  _id: string;
  userId: string;
  key: string;
  __v: 0;
};

export type WeatherAPIError = {
  cod: string;
  message: string;
};
