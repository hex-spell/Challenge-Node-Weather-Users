// eslint-disable-next-line import/prefer-default-export
// esta funcion toma como parametro el código de un ícono y devuelve la url de su ubicación en openweather
export const makeIconUrl = (iconcode: string): string => {
  return `http://openweathermap.org/img/w/${iconcode}.png`;
};

export const kelvinToCelsius = (kelvin: number): string => {
  const celsius = kelvin - 273.15;
  return `${celsius.toFixed(2)} °C`;
};
