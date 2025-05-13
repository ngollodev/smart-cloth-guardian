
export interface WeatherData {
  condition: string;
  temperature: number;
  humidity: number;
  windSpeed: number;
  chanceOfRain: number;
  time: string;
  icon: string;
}

export interface ForecastData {
  current: WeatherData;
  hourly: WeatherData[];
  daily: {
    day: string;
    condition: string;
    min: number;
    max: number;
    chanceOfRain: number;
    icon: string;
  }[];
}

// Mock weather data service
export const getWeatherForecast = async (): Promise<ForecastData> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      const currentHour = new Date().getHours();
      
      // Generate random weather data
      const current: WeatherData = {
        condition: Math.random() > 0.7 ? "Rain" : "Cloudy",
        temperature: Math.round(15 + Math.random() * 15),
        humidity: Math.round(50 + Math.random() * 50),
        windSpeed: Math.round(5 + Math.random() * 15),
        chanceOfRain: Math.round(Math.random() * 100),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        icon: Math.random() > 0.7 ? "cloud-rain" : "cloud-sun"
      };

      // Generate hourly forecast
      const hourly: WeatherData[] = Array(24).fill(0).map((_, i) => {
        const hour = (currentHour + i) % 24;
        const isNight = hour < 6 || hour > 18;
        const chanceOfRain = Math.round(Math.random() * 100);
        
        return {
          condition: chanceOfRain > 70 ? "Rain" : isNight ? "Clear" : "Partly Cloudy",
          temperature: Math.round(10 + Math.random() * 20),
          humidity: Math.round(50 + Math.random() * 50),
          windSpeed: Math.round(5 + Math.random() * 15),
          chanceOfRain,
          time: `${hour}:00`,
          icon: chanceOfRain > 70 ? "cloud-rain" : isNight ? "moon" : "cloud-sun"
        };
      });

      // Generate daily forecast
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const today = new Date().getDay();
      
      const daily = Array(7).fill(0).map((_, i) => {
        const dayIndex = (today + i) % 7;
        const chanceOfRain = Math.round(Math.random() * 100);
        
        return {
          day: i === 0 ? "Today" : days[dayIndex],
          condition: chanceOfRain > 70 ? "Rain" : "Partly Cloudy",
          min: Math.round(10 + Math.random() * 10),
          max: Math.round(20 + Math.random() * 15),
          chanceOfRain,
          icon: chanceOfRain > 70 ? "cloud-rain" : "cloud-sun"
        };
      });

      resolve({ current, hourly, daily });
    }, 500);
  });
};
