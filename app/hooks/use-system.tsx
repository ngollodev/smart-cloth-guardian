
import {
    getSchedules,
    getSystemLogs,
    getSystemStatus,
    performAction,
    Schedule,
    SystemLog,
    SystemStatus
} from "app/services/system-service";
import { ForecastData, getWeatherForecast } from "app/services/weather-service";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";

interface SystemContextType {
  systemStatus: SystemStatus | null;
  weatherData: ForecastData | null;
  logs: SystemLog[];
  schedules: Schedule[];
  loading: boolean;
  refreshData: () => Promise<void>;
  extendClothes: () => Promise<void>;
  retractClothes: () => Promise<void>;
  refreshingData: boolean;
}

const SystemContext = createContext<SystemContextType | undefined>(undefined);

export function SystemProvider({ children }: { children: React.ReactNode }) {
  const [systemStatus, setSystemStatus] = useState<SystemStatus | null>(null);
  const [weatherData, setWeatherData] = useState<ForecastData | null>(null);
  const [logs, setLogs] = useState<SystemLog[]>([]);
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshingData, setRefreshingData] = useState(false);

  const fetchData = async () => {
    try {
      const [status, weather, systemLogs, schedulesData] = await Promise.all([
        getSystemStatus(),
        getWeatherForecast(),
        getSystemLogs(),
        getSchedules()
      ]);
      
      setSystemStatus(status);
      setWeatherData(weather);
      setLogs(systemLogs);
      setSchedules(schedulesData);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to fetch system data");
    } finally {
      setLoading(false);
      setRefreshingData(false);
    }
  };

  useEffect(() => {
    fetchData();
    
    // Auto-refresh data every minute
    const interval = setInterval(() => {
      fetchData();
    }, 60000);
    
    return () => clearInterval(interval);
  }, []);

  const refreshData = async () => {
    setRefreshingData(true);
    await fetchData();
  };

  const extendClothes = async () => {
    try {
      const result = await performAction("extend");
      if (result.success) {
        toast.success("Clothesline extended successfully");
        refreshData();
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error("Error extending clothes:", error);
      toast.error("Failed to extend clothesline");
    }
  };

  const retractClothes = async () => {
    try {
      const result = await performAction("retract");
      if (result.success) {
        toast.success("Clothesline retracted successfully");
        refreshData();
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error("Error retracting clothes:", error);
      toast.error("Failed to retract clothesline");
    }
  };

  return (
    <SystemContext.Provider value={{
      systemStatus,
      weatherData,
      logs,
      schedules,
      loading,
      refreshData,
      extendClothes,
      retractClothes,
      refreshingData
    }}>
      {children}
    </SystemContext.Provider>
  );
}

export function useSystem() {
  const context = useContext(SystemContext);
  if (context === undefined) {
    throw new Error("useSystem must be used within a SystemProvider");
  }
  return context;
}
