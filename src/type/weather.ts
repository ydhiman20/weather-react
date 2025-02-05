export interface Condition {
  text: string;
  icon: string;
}

export interface CurrentWeather {
  temp_c: number;
  condition: Condition;
  humidity: number;
  cloud: number;
  wind_mph: number;
  last_updated: string;
}

export interface Forecast {
  forecastday: ForecastDay[];
}

export interface ForecastDay {
  date: string;
  day: {
    avgtemp_c: number;
    condition: Condition;
  };
}

export interface Location {
  name: string;
  region: string;
}

export interface WeatherData {
  current: CurrentWeather;
  forecast: Forecast;
  location: Location;
}
