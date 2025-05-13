
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Types
export type SystemStatus = {
  clotheslineExtended: boolean;
  motorRunning: boolean;
  lastUpdate: string;
  batteryLevel: number;
  connectionStatus: 'online' | 'offline';
};

export type WeatherData = {
  temperature: number;
  humidity: number;
  conditions: string;
  rainProbability: number;
  windSpeed: number;
  location: string;
  updatedAt: string;
};

export type Schedule = {
  id: string;
  name: string;
  time: string;
  days: string[];
  action: 'extend' | 'retract';
  enabled: boolean;
};

export type SystemLog = {
  id: string;
  timestamp: string;
  eventType: 'system' | 'action' | 'weather' | 'error';
  message: string;
  details?: string;
};

type SystemContextType = {
  systemStatus: SystemStatus;
  weatherData: WeatherData;
  schedules: Schedule[];
  logs: SystemLog[];
  loading: boolean;
  refreshingData: boolean;
  refreshData: () => Promise<void>;
  controlSystem: (action: 'extend' | 'retract') => Promise<boolean>;
};

// Mock data
const mockSystemStatus: SystemStatus = {
  clotheslineExtended: true,
  motorRunning: false,
  lastUpdate: new Date().toISOString(),
  batteryLevel: 78,
  connectionStatus: 'online'
};

const mockWeatherData: WeatherData = {
  temperature: 24,
  humidity: 62,
  conditions: 'Partly Cloudy',
  rainProbability: 30,
  windSpeed: 12,
  location: 'New York, NY',
  updatedAt: new Date().toISOString()
};

const mockSchedules: Schedule[] = [
  {
    id: '1',
    name: 'Morning Extension',
    time: '08:00',
    days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    action: 'extend',
    enabled: true
  },
  {
    id: '2',
    name: 'Evening Retraction',
    time: '19:00',
    days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    action: 'retract',
    enabled: true
  }
];

const mockLogs: SystemLog[] = [
  {
    id: '1',
    timestamp: new Date().toISOString(),
    eventType: 'system',
    message: 'System started',
    details: 'Clothesline guardian initialized successfully'
  },
  {
    id: '2',
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    eventType: 'action',
    message: 'Clothesline extended',
    details: 'Manual activation via mobile app'
  },
  {
    id: '3',
    timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    eventType: 'weather',
    message: 'Rain detected',
    details: 'Automatic retraction triggered'
  }
];

// Create context
const SystemContext = createContext<SystemContextType | undefined>(undefined);

// Provider component
export function SystemProvider({ children }: { children: ReactNode }) {
  const [systemStatus, setSystemStatus] = useState<SystemStatus>(mockSystemStatus);
  const [weatherData, setWeatherData] = useState<WeatherData>(mockWeatherData);
  const [schedules, setSchedules] = useState<Schedule[]>(mockSchedules);
  const [logs, setLogs] = useState<SystemLog[]>(mockLogs);
  const [loading, setLoading] = useState(true);
  const [refreshingData, setRefreshingData] = useState(false);

  useEffect(() => {
    // Simulate initial data loading
    const loadInitialData = async () => {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setLoading(false);
    };
    
    loadInitialData();
    
    // Simulate occasional status updates
    const interval = setInterval(() => {
      // Update weather data slightly
      setWeatherData(prev => ({
        ...prev,
        temperature: prev.temperature + (Math.random() * 2 - 1),
        humidity: Math.min(100, Math.max(0, prev.humidity + (Math.random() * 5 - 2.5))),
        rainProbability: Math.min(100, Math.max(0, prev.rainProbability + (Math.random() * 10 - 5))),
        updatedAt: new Date().toISOString()
      }));
    }, 30000);
    
    return () => clearInterval(interval);
  }, []);
  
  const refreshData = async () => {
    setRefreshingData(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      // Update data with new timestamps
      setSystemStatus(prev => ({ ...prev, lastUpdate: new Date().toISOString() }));
      setWeatherData(prev => ({ 
        ...prev, 
        updatedAt: new Date().toISOString(),
        temperature: Math.round((20 + Math.random() * 10) * 10) / 10, // Between 20-30°C
        rainProbability: Math.round(Math.random() * 100)
      }));
    } finally {
      setRefreshingData(false);
    }
  };
  
  const controlSystem = async (action: 'extend' | 'retract'): Promise<boolean> => {
    // Simulate controlling the system
    setSystemStatus(prev => ({
      ...prev,
      motorRunning: true
    }));
    
    // Simulate delay in motor operation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Update the status
    setSystemStatus(prev => ({
      ...prev,
      clotheslineExtended: action === 'extend',
      motorRunning: false,
      lastUpdate: new Date().toISOString()
    }));
    
    // Add a log entry
    const newLog: SystemLog = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      eventType: 'action',
      message: `Clothesline ${action}ed`,
      details: 'Manual activation via mobile app'
    };
    
    setLogs(prev => [newLog, ...prev]);
    
    return true;
  };
  
  return (
    <SystemContext.Provider
      value={{
        systemStatus,
        weatherData,
        schedules,
        logs,
        loading,
        refreshingData,
        refreshData,
        controlSystem
      }}
    >
      {children}
    </SystemContext.Provider>
  );
}

export function useSystem() {
  const context = useContext(SystemContext);
  
  if (context === undefined) {
    throw new Error('useSystem must be used within a SystemProvider');
  }
  
  return context;
}
