
export interface SystemStatus {
  isOnline: boolean;
  deviceState: "idle" | "extending" | "retracting" | "error";
  lastAction: {
    action: string;
    timestamp: string;
    trigger: "manual" | "automatic" | "scheduled";
    details?: string;
  };
  motorHealth: number; // 0-100
  batteryLevel: number; // 0-100
  connectionStrength: number; // 0-100
  rainSensorActive: boolean;
}

export interface SystemLog {
  id: string;
  timestamp: string;
  eventType: "system" | "action" | "error" | "weather";
  message: string;
  details?: string;
}

export interface Schedule {
  id: string;
  name: string;
  time: string;
  days: string[];
  action: "extend" | "retract";
  enabled: boolean;
}

// Mock system service
export const getSystemStatus = (): Promise<SystemStatus> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        isOnline: Math.random() > 0.1,
        deviceState: Math.random() > 0.9 ? "error" : 
          Math.random() > 0.8 ? "extending" : 
          Math.random() > 0.7 ? "retracting" : "idle",
        lastAction: {
          action: Math.random() > 0.5 ? "Clothes retracted" : "Clothes extended",
          timestamp: new Date(Date.now() - Math.random() * 3600000).toLocaleString(),
          trigger: Math.random() > 0.6 ? "automatic" : 
                   Math.random() > 0.3 ? "scheduled" : "manual",
          details: Math.random() > 0.5 ? "Due to rain detection" : undefined
        },
        motorHealth: Math.round(70 + Math.random() * 30),
        batteryLevel: Math.round(50 + Math.random() * 50),
        connectionStrength: Math.round(60 + Math.random() * 40),
        rainSensorActive: Math.random() > 0.7
      });
    }, 300);
  });
};

export const getSystemLogs = (): Promise<SystemLog[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const logs: SystemLog[] = [];
      const now = new Date();
      
      for (let i = 0; i < 20; i++) {
        const timestamp = new Date(now.getTime() - i * (Math.random() * 3600000));
        const eventType = Math.random() > 0.7 ? "system" : 
                          Math.random() > 0.5 ? "action" : 
                          Math.random() > 0.3 ? "weather" : "error";
        
        let message = "";
        let details;
        
        switch(eventType) {
          case "system":
            message = Math.random() > 0.5 ? "System online" : "System check completed";
            break;
          case "action":
            message = Math.random() > 0.5 ? "Clothes retracted" : "Clothes extended";
            details = Math.random() > 0.5 ? "Manual trigger via app" : "Scheduled action executed";
            break;
          case "weather":
            message = Math.random() > 0.5 ? "Rain detected" : "Weather alert received";
            details = Math.random() > 0.5 ? "Light rain detected by sensor" : "Heavy rain forecast";
            break;
          case "error":
            message = Math.random() > 0.5 ? "Motor stalled" : "Connection lost";
            details = "Reconnecting...";
            break;
        }
        
        logs.push({
          id: `log-${i}`,
          timestamp: timestamp.toLocaleString(),
          eventType,
          message,
          details
        });
      }
      
      resolve(logs);
    }, 500);
  });
};

export const getSchedules = (): Promise<Schedule[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: "1",
          name: "Morning Extend",
          time: "07:30",
          days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          action: "extend",
          enabled: true
        },
        {
          id: "2",
          name: "Evening Retract",
          time: "18:00",
          days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          action: "retract",
          enabled: true
        },
        {
          id: "3",
          name: "Weekend Schedule",
          time: "08:30",
          days: ["Saturday", "Sunday"],
          action: "extend",
          enabled: false
        }
      ]);
    }, 400);
  });
};

export const performAction = (action: "extend" | "retract"): Promise<{ success: boolean, message: string }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: Math.random() > 0.1,
        message: Math.random() > 0.1 
          ? `Successfully ${action === "extend" ? "extended" : "retracted"} clothesline` 
          : "Error: Device unresponsive"
      });
    }, 1000);
  });
};
