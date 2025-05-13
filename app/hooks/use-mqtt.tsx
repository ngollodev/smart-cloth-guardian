
import { useSystem } from "app/hooks/use-system";
import { MqttMessage, mqttService, TOPICS } from "app/services/mqtt-service";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

export function useMqtt() {
  const [isConnected, setIsConnected] = useState(false);
  const [rainStatus, setRainStatus] = useState<{ detected: boolean; intensity: number } | null>(null);
  const [motorStatus, setMotorStatus] = useState<string | null>(null);
  const { refreshData } = useSystem();

  // Connect to MQTT broker
  const connect = useCallback(async () => {
    try {
      const connected = await mqttService.connect();
      setIsConnected(connected);
      return connected;
    } catch (error) {
      console.error("Failed to connect to MQTT broker:", error);
      toast.error("Failed to connect to MQTT service");
      return false;
    }
  }, []);

  // Disconnect from MQTT broker
  const disconnect = useCallback(async () => {
    try {
      await mqttService.disconnect();
      setIsConnected(false);
    } catch (error) {
      console.error("Failed to disconnect from MQTT broker:", error);
    }
  }, []);

  // Handle rain sensor messages
  const handleRainSensor = useCallback((message: MqttMessage) => {
    const { detected, intensity } = message.payload;
    setRainStatus({ detected, intensity });
    
    if (detected) {
      toast.info(`Rain detected (${Math.round(intensity)}% intensity)`);
    }
  }, []);

  // Handle motor status updates
  const handleMotorStatus = useCallback((message: MqttMessage) => {
    const status = message.payload?.status;
    setMotorStatus(status);
    
    if (status === "extending") {
      toast.success("Clothesline is extending");
    } else if (status === "retracting") {
      toast.success("Clothesline is retracting");
    }
  }, []);

  // Handle system status updates
  const handleSystemStatus = useCallback((message: MqttMessage) => {
    // Refresh system data when we receive updated status
    refreshData();
  }, [refreshData]);

  // Send command to extend clothesline
  const extendClothes = useCallback(() => {
    if (!isConnected) {
      toast.error("MQTT not connected");
      return;
    }
    
    mqttService.publish(TOPICS.CONTROL_COMMANDS, {
      command: "extend",
      timestamp: new Date().toISOString()
    });
    
    // Simulate motor status update after command
    setTimeout(() => {
      mqttService.publish(TOPICS.MOTOR_STATUS, {
        status: "extending",
        timestamp: new Date().toISOString()
      });
    }, 500);
  }, [isConnected]);

  // Send command to retract clothesline
  const retractClothes = useCallback(() => {
    if (!isConnected) {
      toast.error("MQTT not connected");
      return;
    }
    
    mqttService.publish(TOPICS.CONTROL_COMMANDS, {
      command: "retract",
      timestamp: new Date().toISOString()
    });
    
    // Simulate motor status update after command
    setTimeout(() => {
      mqttService.publish(TOPICS.MOTOR_STATUS, {
        status: "retracting",
        timestamp: new Date().toISOString()
      });
    }, 500);
  }, [isConnected]);

  // Set up subscriptions
  useEffect(() => {
    if (isConnected) {
      mqttService.subscribe(TOPICS.RAIN_SENSOR, handleRainSensor);
      mqttService.subscribe(TOPICS.MOTOR_STATUS, handleMotorStatus);
      mqttService.subscribe(TOPICS.SYSTEM_STATUS, handleSystemStatus);
    }
    
    return () => {
      if (isConnected) {
        mqttService.unsubscribe(TOPICS.RAIN_SENSOR, handleRainSensor);
        mqttService.unsubscribe(TOPICS.MOTOR_STATUS, handleMotorStatus);
        mqttService.unsubscribe(TOPICS.SYSTEM_STATUS, handleSystemStatus);
      }
    };
  }, [isConnected, handleRainSensor, handleMotorStatus, handleSystemStatus]);

  return {
    isConnected,
    connect,
    disconnect,
    rainStatus,
    motorStatus,
    extendClothes,
    retractClothes
  };
}
