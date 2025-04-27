
import { useState, useEffect } from "react";
import SearchBar from "@/components/SearchBar";
import CurrentWeather from "@/components/CurrentWeather";
import ForecastCard from "@/components/ForecastCard";
import WeatherDetails from "@/components/WeatherDetails";
import UnitToggle from "@/components/UnitToggle";
import { getWeatherData } from "@/services/weatherService";
import { WeatherData, TemperatureUnit } from "@/types/weather";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [city, setCity] = useState<string>("London"); // Default city
  const [unit, setUnit] = useState<TemperatureUnit>("celsius");
  const { toast } = useToast();

  // Get weather data for the default city on first load
  useEffect(() => {
    fetchWeatherData(city);
  }, []);

  const fetchWeatherData = async (cityName: string) => {
    setLoading(true);
    try {
      const data = await getWeatherData(cityName);
      setWeatherData(data);
      setCity(cityName);
    } catch (error) {
      toast({
        title: "Error",
        description: `Could not find weather data for ${cityName}`,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUnitChange = (newUnit: TemperatureUnit) => {
    setUnit(newUnit);
  };

  // Determine background class based on weather condition and time
  const getBackgroundClass = () => {
    if (!weatherData) return "bg-sunny";
    
    const iconCode = weatherData.icon;
    
    if (iconCode.includes("01") || iconCode.includes("02")) {
      return iconCode.endsWith("n") ? "bg-night" : "bg-sunny";
    } else if (iconCode.includes("03") || iconCode.includes("04")) {
      return "bg-cloudy";
    } else if (
      iconCode.includes("09") || 
      iconCode.includes("10") || 
      iconCode.includes("11")
    ) {
      return "bg-rainy";
    } else {
      return "bg-cloudy";
    }
  };

  return (
    <div className={`min-h-screen flex flex-col items-center ${getBackgroundClass()} p-4 md:p-8 transition-all duration-500`}>
      <div className="w-full max-w-4xl mx-auto">
        <div className="flex flex-col items-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-6">Weather App</h1>
          
          <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
            <SearchBar onSearch={fetchWeatherData} isLoading={loading} />
            <UnitToggle unit={unit} onUnitChange={handleUnitChange} />
          </div>
          
          {loading ? (
            <div className="flex justify-center items-center h-32">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
            </div>
          ) : weatherData ? (
            <>
              <CurrentWeather data={weatherData} unit={unit} />
              
              <div className="mt-8 w-full">
                <h2 className="text-xl font-semibold text-white mb-4">3-Day Forecast</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {weatherData.forecast.map((day, index) => (
                    <ForecastCard key={index} forecast={day} unit={unit} />
                  ))}
                </div>
              </div>
              
              <div className="mt-8 w-full">
                <h2 className="text-xl font-semibold text-white mb-4">Weather Details</h2>
                <WeatherDetails 
                  humidity={weatherData.humidity}
                  windSpeed={weatherData.wind_speed}
                />
              </div>
            </>
          ) : (
            <p className="text-white">Enter a city to get weather information</p>
          )}
        </div>
      </div>
      
      <footer className="mt-auto text-white/70 text-sm">
        <p>Weather data provided by OpenWeatherMap</p>
      </footer>
    </div>
  );
};

export default Index;
