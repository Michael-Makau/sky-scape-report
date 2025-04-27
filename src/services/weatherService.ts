
import { WeatherData } from "../types/weather";

// OpenWeatherMap API key - in a real app, this would be stored in environment variables
const API_KEY = "4d8fb5b93d4af21d66a2948710284366"; // This is a sample key, replace with your own
const BASE_URL = "https://api.openweathermap.org/data/2.5";

/**
 * Fetches weather data for a given city
 * @param city - The city to fetch weather data for
 * @returns Promise with the weather data
 */
export const getWeatherData = async (city: string): Promise<WeatherData> => {
  try {
    // Fetch current weather data
    const currentResponse = await fetch(
      `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`
    );
    
    if (!currentResponse.ok) {
      throw new Error("City not found");
    }
    
    const currentData = await currentResponse.json();
    
    // Fetch 5-day forecast data
    const forecastResponse = await fetch(
      `${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric`
    );
    
    if (!forecastResponse.ok) {
      throw new Error("Forecast data not available");
    }
    
    const forecastData = await forecastResponse.json();
    
    // Process forecast data to get next 3 days
    const forecast = processForecastData(forecastData);
    
    // Format the date
    const currentDate = new Date();
    const formattedDate = new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(currentDate);
    
    // Return formatted weather data
    return {
      city: currentData.name,
      country: currentData.sys.country,
      date: formattedDate,
      temp: Math.round(currentData.main.temp),
      feels_like: Math.round(currentData.main.feels_like),
      humidity: currentData.main.humidity,
      wind_speed: Math.round(currentData.wind.speed),
      description: capitalizeFirstLetter(currentData.weather[0].description),
      icon: currentData.weather[0].icon,
      forecast: forecast,
    };
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
};

/**
 * Converts temperature from Celsius to Fahrenheit
 * @param celsius - Temperature in Celsius
 * @returns Temperature in Fahrenheit (rounded to nearest integer)
 */
export const celsiusToFahrenheit = (celsius: number): number => {
  return Math.round((celsius * 9) / 5 + 32);
};

/**
 * Processes forecast data to get the next 3 days
 * @param forecastData - Raw forecast data from API
 * @returns Array of forecast days
 */
const processForecastData = (forecastData: any) => {
  const uniqueDays = new Set<string>();
  const forecast = [];
  const currentDate = new Date().getDate();
  
  // Get one forecast per day (at noon) for the next 3 days
  for (const item of forecastData.list) {
    const date = new Date(item.dt * 1000);
    const day = date.getDate();
    
    // Skip current day and only get forecasts for unique future days
    if (day !== currentDate && !uniqueDays.has(day.toString()) && forecast.length < 3) {
      uniqueDays.add(day.toString());
      
      forecast.push({
        date: new Intl.DateTimeFormat('en-US', {
          month: 'short',
          day: 'numeric',
        }).format(date),
        day: new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(date),
        temp: Math.round(item.main.temp),
        description: capitalizeFirstLetter(item.weather[0].description),
        icon: item.weather[0].icon,
      });
    }
  }
  
  return forecast;
};

/**
 * Capitalizes the first letter of each word in a string
 * @param str - The string to capitalize
 * @returns Capitalized string
 */
const capitalizeFirstLetter = (str: string): string => {
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};
