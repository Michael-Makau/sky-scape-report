
import { Card, CardContent } from "@/components/ui/card";
import WeatherIcon from "./WeatherIcon";
import { ForecastDay, TemperatureUnit } from "@/types/weather";
import { celsiusToFahrenheit } from "@/services/weatherService";

interface ForecastCardProps {
  forecast: ForecastDay;
  unit: TemperatureUnit;
}

const ForecastCard = ({ forecast, unit }: ForecastCardProps) => {
  const temperature = unit === 'celsius' 
    ? forecast.temp
    : celsiusToFahrenheit(forecast.temp);

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-weather-blue">
      <CardContent className="flex flex-col items-center p-4">
        <p className="font-semibold text-sm">{forecast.day}</p>
        <p className="text-xs text-gray-500">{forecast.date}</p>
        <div className="my-2">
          <WeatherIcon iconCode={forecast.icon} size={36} />
        </div>
        <p className="text-xl font-bold">{temperature}°{unit === 'celsius' ? 'C' : 'F'}</p>
        <p className="text-xs text-gray-600 mt-1">{forecast.description}</p>
      </CardContent>
    </Card>
  );
};

export default ForecastCard;
