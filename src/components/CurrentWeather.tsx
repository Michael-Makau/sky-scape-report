
import WeatherIcon from "./WeatherIcon";
import { Card, CardContent } from "@/components/ui/card";
import { WeatherData, TemperatureUnit } from "@/types/weather";
import { celsiusToFahrenheit } from "@/services/weatherService";

interface CurrentWeatherProps {
  data: WeatherData;
  unit: TemperatureUnit;
}

const CurrentWeather = ({ data, unit }: CurrentWeatherProps) => {
  const temperature = unit === 'celsius' 
    ? data.temp
    : celsiusToFahrenheit(data.temp);
  
  const feelsLike = unit === 'celsius'
    ? data.feels_like
    : celsiusToFahrenheit(data.feels_like);

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-weather-blue w-full max-w-md">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">{data.city}, {data.country}</h1>
            <p className="text-gray-500">{data.date}</p>
          </div>
          <WeatherIcon iconCode={data.icon} size={64} />
        </div>
        
        <div className="mt-4">
          <div className="flex items-end">
            <span className="text-6xl font-bold">{temperature}</span>
            <span className="text-3xl ml-1">°{unit === 'celsius' ? 'C' : 'F'}</span>
          </div>
          <p className="text-lg">{data.description}</p>
          <p className="text-sm text-gray-500">
            Feels like: {feelsLike}°{unit === 'celsius' ? 'C' : 'F'}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default CurrentWeather;
