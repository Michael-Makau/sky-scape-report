
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { TemperatureUnit } from "@/types/weather";

interface UnitToggleProps {
  unit: TemperatureUnit;
  onUnitChange: (unit: TemperatureUnit) => void;
}

const UnitToggle = ({ unit, onUnitChange }: UnitToggleProps) => {
  const toggleUnit = () => {
    onUnitChange(unit === 'celsius' ? 'fahrenheit' : 'celsius');
  };

  return (
    <div className="flex items-center space-x-2">
      <Label htmlFor="unit-toggle" className="text-sm font-medium">°C</Label>
      <Switch
        id="unit-toggle"
        checked={unit === 'fahrenheit'}
        onCheckedChange={toggleUnit}
      />
      <Label htmlFor="unit-toggle" className="text-sm font-medium">°F</Label>
    </div>
  );
};

export default UnitToggle;
