
import { createContext, useContext, useState, useEffect } from 'react';

// Create context
const SystemContext = createContext();

// Mock data
const mockSystemStatus = {
  clotheslineExtended: true,
  motorRunning: false,
  lastUpdate: new Date().toISOString(),
  batteryLevel: 78,
  connectionStatus: 'online'
};

const mockWeatherData = {
  temperature: 24,
  humidity: 62,
  conditions: 'Partly Cloudy',
  rainProbability: 30,
  windSpeed: 12,
  location: 'New York, NY',
  updatedAt: new Date().toISOString()
};

const mockSchedules = [
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

const mockLogs = [
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

// Provider component
export function SystemProvider({ children }) {
  const [systemStatus, setSystemStatus] = useState(mockSystemStatus);
  const [weatherData, setWeatherData] = useState(mockWeatherData);
  const [schedules, setSchedules] = useState(mockSchedules);
  const [logs, setLogs] = useState(mockLogs);
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
  
  const controlSystem = async (action) => {
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
    const newLog = {
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
