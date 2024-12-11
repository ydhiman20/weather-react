import { useEffect, useState, useCallback } from "react";
import { ApiHelper } from "../../utils/api/ApiHelper";
import Header from "../header/Header";
import Renderweather from "../renderweather/Renderweather";

const MessageCard = (props) => {
  return (
    <div className="">
      <div className="container mx-auto ">
        <section className="bg-white text-black rounded-lg  shadow-sm p-6 mb-6">
          {props.mesage}
        </section>
      </div>
    </div>
  );
};

const Weather = () => {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [citySuggestions, setCitySuggestions] = useState([]);
  const { WEATHER_APP_KEY } = process.env;
  const BASE_API_URL = "https://api.weatherapi.com/v1/forecast.json";
  const SEARCH_API_URL = "https://api.weatherapi.com/v1/search.json";

  const apiEndPoint = useCallback(() => {
    return `${BASE_API_URL}?key=${WEATHER_APP_KEY}&q=${city}&days=6&aqi=yes`;
  }, [WEATHER_APP_KEY, city]);

  const fetchWeatherData = useCallback(async () => {
    if (!city) return;
    setLoading(true);
    try {
      const data = await ApiHelper(apiEndPoint());
      setWeather(data);
    } catch (error) {
      console.error("Failed to fetch weather data:", error);
    } finally {
      setLoading(false);
    }
  }, [apiEndPoint]);

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

  const handleCityChange = useCallback((cityName) => {
    setCity(cityName);
  }, []);

  return (
    <div className="h-full min-h-screen w-full mx-auto max-w-3xl">
      <Header parentValueInput={handleCityChange} />
      {loading ? (
        <MessageCard mesage="Weather data loading..." />
      ) : weather ? (
        <Renderweather weather={weather} />
      ) : (
        <MessageCard mesage="No weather data available." />
      )}
    </div>
  );
};

export default Weather;
