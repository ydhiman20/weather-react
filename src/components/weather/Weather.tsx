import { useCallback, useEffect, useState } from "react";

import { WeatherData } from "../../type/weather";
import { ApiHelper } from "../../utils/api/ApiHelper";
import Header from "../header/Header";
import MessageCard from "../messageCard/MessageCard";
import WeatherCard from "../weathercard/WeatherCard";

const Weather = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [city, setCity] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { WEATHER_APP_KEY } = process.env;
  const BASE_API_URL = "https://api.weatherapi.com/v1/forecast.json";

  const apiEndPoint = useCallback(
    (): string => `${BASE_API_URL}?key=${WEATHER_APP_KEY}&q=${city}&days=6&aqi=yes`,
    [WEATHER_APP_KEY, city]
  );

  const fetchWeatherData = useCallback(async () => {
    if (!city) return;
    setLoading(true);
    try {
      const data = await ApiHelper<WeatherData>(apiEndPoint());
      setWeather(data);
    } catch (error) {
      console.error("Failed to fetch weather data:", error);
    } finally {
      setLoading(false);
    }
  }, [apiEndPoint, city]);

  const fetchDataGeoLocation = useCallback(() => {
    if (!("geolocation" in navigator)) return;
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCity(`${latitude},${longitude}`);
        setLoading(false);
      },
      (error) => {
        console.error("Geolocation retrieval failed:", error.message);
        setLoading(false);
      }
    );
  }, []);

  useEffect(() => {
    fetchDataGeoLocation();
  }, [fetchDataGeoLocation]);

  useEffect(() => {
    fetchWeatherData();
  }, [fetchWeatherData]);

  const handleCityChange = useCallback((cityName: string) => {
    setCity(cityName);
  }, []);

  return (
    <div className="flex md:rounded-2xl overflow-hidden align-middle items-center bg-white  w-full">
      <div className="mx-auto container">
        <Header
          fetchDataGeoLocation={fetchDataGeoLocation}
          parentValueInput={handleCityChange}
        />
        {loading ? (
          <MessageCard message="Weather data loading..." />
        ) : weather ? (
          <WeatherCard data={weather} />
        ) : (
          <MessageCard message="No weather data available." />
        )}
      </div>
    </div>
  );
};

export default Weather;
