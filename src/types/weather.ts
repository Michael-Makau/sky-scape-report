
export interface WeatherData {
  city: string;
  country: string;
  date: string;
  temp: number;
  feels_like: number;
  humidity: number;
  wind_speed: number;
  description: string;
  icon: string;
  forecast: ForecastDay[];
}

export interface ForecastDay {
  date: string;
  day: string;
  temp: number;
  description: string;
  icon: string;
}

export interface WeatherError {
  message: string;
}

export type TemperatureUnit = 'celsius' | 'fahrenheit';
