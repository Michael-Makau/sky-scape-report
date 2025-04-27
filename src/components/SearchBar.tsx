
import { useState, KeyboardEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SearchBarProps {
  onSearch: (city: string) => void;
  isLoading: boolean;
}

const SearchBar = ({ onSearch, isLoading }: SearchBarProps) => {
  const [query, setQuery] = useState<string>("");
  const { toast } = useToast();

  const handleSearch = () => {
    if (!query.trim()) {
      toast({
        title: "Search Error",
        description: "Please enter a city name",
        variant: "destructive",
      });
      return;
    }
    onSearch(query.trim());
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="flex w-full max-w-sm items-center space-x-2">
      <Input
        type="text"
        placeholder="Enter city name..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={handleKeyPress}
        className="bg-white/90 border-weather-blue focus:border-weather-blue"
        disabled={isLoading}
      />
      <Button 
        onClick={handleSearch} 
        disabled={isLoading}
        className="bg-weather-blue hover:bg-blue-600"
      >
        <Search className="h-4 w-4 mr-2" />
        Search
      </Button>
    </div>
  );
};

export default SearchBar;
