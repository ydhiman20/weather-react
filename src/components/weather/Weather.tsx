import { useEffect, useState, useCallback, SetStateAction } from "react";

import { ApiHelper } from "../../utils/api/ApiHelper";
import Header from "../header/Header";
import MessageCard from "../messageCard/MessageCard";
import WeatherCard from "../weathercard/Weathercard";

const Weather = () => {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  // const [citySuggestions, setCitySuggestions] = useState([]);
  const { WEATHER_APP_KEY } = process.env;
  const BASE_API_URL = "https://api.weatherapi.com/v1/forecast.json";
  // const SEARCH_API_URL = "https://api.weatherapi.com/v1/search.json";

  const apiEndPoint = useCallback(() => {
    return `${BASE_API_URL}?key=${WEATHER_APP_KEY}&q=${city}&days=6&aqi=yes`;
  }, [WEATHER_APP_KEY, city]);

  // const apiSearchEndPoint = useCallback(
  //   (query) => {
  //     return `${SEARCH_API_URL}?key=${WEATHER_APP_KEY}&q=${query}`;
  //   },
  //   [WEATHER_APP_KEY]
  // );

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
  }, [apiEndPoint, city]);

  // const fetchCitySuggestions = useCallback(
  //   async (query) => {
  //     if (!query) {
  //       setCitySuggestions([]);
  //       return;
  //     }
  //     try {
  //       const suggestions = await ApiHelper(apiSearchEndPoint(query));
  //       setCitySuggestions(suggestions.map((item) => item.name));
  //     } catch (error) {
  //       console.error("Failed to fetch city suggestions:", error);
  //     }
  //   },
  //   [apiSearchEndPoint]
  // );

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

  const handleCityChange = useCallback((cityName: SetStateAction<string>) => {
    setCity(cityName);
    // setCitySuggestions([]); // Clear suggestions after a city is selected
  }, []);

  // const handleCityInputChange = useCallback(
  //   (query) => {
  //     setCity(query);
  //     // Debounced API call
  //     const timeoutId = setTimeout(() => {
  //       fetchCitySuggestions(query);
  //     }, 2000); // 300ms debounce

  //     return () => clearTimeout(timeoutId); // Clear previous timeout
  //   },
  //   [fetchCitySuggestions]
  // );

  return (
    <div className="flex container m-auto h-full align-middle items-center">
      <div className="mx-auto container">
        <Header parentValueInput={handleCityChange} />
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
