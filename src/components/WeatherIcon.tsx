
import { 
  CloudDrizzle, 
  CloudFog, 
  CloudLightning, 
  CloudRain, 
  CloudSnow, 
  Cloud, 
  CloudSun, 
  Sun 
} from "lucide-react";
import { cn } from "@/lib/utils";

interface WeatherIconProps {
  iconCode: string;
  size?: number;
  className?: string;
}

const WeatherIcon = ({ iconCode, size = 24, className }: WeatherIconProps) => {
  // Map OpenWeatherMap icon codes to Lucide icons
  const getIcon = () => {
    switch (iconCode) {
      case '01d': // clear sky day
        return <Sun size={size} className="text-weather-orange" />;
      case '01n': // clear sky night
        return <Sun size={size} className="text-weather-light-gray" />;
      case '02d': // few clouds day
      case '02n': // few clouds night
        return <CloudSun size={size} className="text-weather-blue" />;
      case '03d': // scattered clouds day
      case '03n': // scattered clouds night
      case '04d': // broken clouds day
      case '04n': // broken clouds night
        return <Cloud size={size} className="text-weather-gray" />;
      case '09d': // shower rain day
      case '09n': // shower rain night
        return <CloudDrizzle size={size} className="text-weather-blue" />;
      case '10d': // rain day
      case '10n': // rain night
        return <CloudRain size={size} className="text-weather-blue" />;
      case '11d': // thunderstorm day
      case '11n': // thunderstorm night
        return <CloudLightning size={size} className="text-weather-dark-blue" />;
      case '13d': // snow day
      case '13n': // snow night
        return <CloudSnow size={size} className="text-weather-light-blue" />;
      case '50d': // mist day
      case '50n': // mist night
        return <CloudFog size={size} className="text-weather-gray" />;
      default:
        return <Sun size={size} className="text-weather-orange" />;
    }
  };

  return (
    <div className={cn("animate-float", className)}>
      {getIcon()}
    </div>
  );
};

export default WeatherIcon;
