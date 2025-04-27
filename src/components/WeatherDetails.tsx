
import { Wind, Droplets } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface WeatherDetailsProps {
  humidity: number;
  windSpeed: number;
}

const WeatherDetails = ({ humidity, windSpeed }: WeatherDetailsProps) => {
  return (
    <div className="grid grid-cols-2 gap-4 w-full max-w-md">
      <Card className="bg-white/80 backdrop-blur-sm border-weather-blue">
        <CardContent className="flex flex-col items-center justify-center p-6">
          <Droplets className="h-8 w-8 text-weather-blue mb-2" />
          <p className="text-sm text-gray-500">Humidity</p>
          <p className="text-2xl font-bold">{humidity}%</p>
        </CardContent>
      </Card>
      
      <Card className="bg-white/80 backdrop-blur-sm border-weather-blue">
        <CardContent className="flex flex-col items-center justify-center p-6">
          <Wind className="h-8 w-8 text-weather-blue mb-2" />
          <p className="text-sm text-gray-500">Wind Speed</p>
          <p className="text-2xl font-bold">{windSpeed} m/s</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default WeatherDetails;
