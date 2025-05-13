
// This is a mock MQTT service that simulates real-time communication
// Later, this would be replaced with an actual MQTT client library (like MQTT.js)

import { toast } from "sonner";

// MQTT topics
const TOPICS = {
  RAIN_SENSOR: "cloth-guardian/sensors/rain",
  MOTOR_STATUS: "cloth-guardian/motor/status",
  SYSTEM_STATUS: "cloth-guardian/system/status",
  CONTROL_COMMANDS: "cloth-guardian/control/commands"
};

// Type definitions
export interface MqttMessage {
  topic: string;
  payload: any;
  timestamp: number;
}

export type MqttSubscriber = (message: MqttMessage) => void;

class MqttService {
  private subscribers: Map<string, MqttSubscriber[]> = new Map();
  private connected: boolean = false;
  private simulationInterval: NodeJS.Timeout | null = null;
  
  // Connection management
  connect(brokerUrl: string = "mqtt://mock-broker.example"): Promise<boolean> {
    return new Promise((resolve) => {
      // Simulate connection delay
      setTimeout(() => {
        this.connected = true;
        toast.success("MQTT Connected");
        this.startSimulation();
        resolve(true);
      }, 1000);
    });
  }
  
  disconnect(): Promise<void> {
    return new Promise((resolve) => {
      if (this.simulationInterval) {
        clearInterval(this.simulationInterval);
        this.simulationInterval = null;
      }
      
      this.connected = false;
      toast.info("MQTT Disconnected");
      resolve();
    });
  }
  
  isConnected(): boolean {
    return this.connected;
  }
  
  // Subscribe to topics
  subscribe(topic: string, callback: MqttSubscriber): void {
    if (!this.subscribers.has(topic)) {
      this.subscribers.set(topic, []);
    }
    
    this.subscribers.get(topic)?.push(callback);
    console.log(`Subscribed to topic: ${topic}`);
  }
  
  unsubscribe(topic: string, callback: MqttSubscriber): void {
    if (!this.subscribers.has(topic)) return;
    
    const topicSubscribers = this.subscribers.get(topic) || [];
    this.subscribers.set(
      topic, 
      topicSubscribers.filter(cb => cb !== callback)
    );
    
    console.log(`Unsubscribed from topic: ${topic}`);
  }
  
  // Publish message to a topic
  publish(topic: string, payload: any): void {
    if (!this.connected) {
      console.warn("Cannot publish: MQTT not connected");
      return;
    }
    
    const message: MqttMessage = {
      topic,
      payload,
      timestamp: Date.now()
    };
    
    console.log(`Publishing to ${topic}:`, payload);
    
    // Simulate server processing the message and broadcasting to subscribers
    setTimeout(() => {
      this.broadcastToSubscribers(message);
    }, 200);
  }
  
  private broadcastToSubscribers(message: MqttMessage): void {
    const subscribers = this.subscribers.get(message.topic);
    if (subscribers && subscribers.length > 0) {
      subscribers.forEach(callback => callback(message));
    }
  }
  
  // Simulation methods
  private startSimulation(): void {
    // Stop any existing simulation
    if (this.simulationInterval) {
      clearInterval(this.simulationInterval);
    }
    
    // Start new simulation
    this.simulationInterval = setInterval(() => {
      this.simulateRandomEvents();
    }, 10000); // Every 10 seconds
  }
  
  private simulateRandomEvents(): void {
    const randomEvent = Math.random();
    
    // Simulate rain detection (20% chance)
    if (randomEvent < 0.2) {
      this.broadcastToSubscribers({
        topic: TOPICS.RAIN_SENSOR,
        payload: { detected: true, intensity: Math.random() * 100 },
        timestamp: Date.now()
      });
    }
    
    // Simulate system status updates
    this.broadcastToSubscribers({
      topic: TOPICS.SYSTEM_STATUS,
      payload: {
        batteryLevel: Math.round(50 + Math.random() * 50),
        connectionStrength: Math.round(60 + Math.random() * 40),
        motorHealth: Math.round(70 + Math.random() * 30),
        lastChecked: new Date().toISOString()
      },
      timestamp: Date.now()
    });
  }
}

// Export singleton instance
export const mqttService = new MqttService();

// Export MQTT topics
export { TOPICS };
