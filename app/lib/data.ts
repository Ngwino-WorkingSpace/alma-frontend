export type FoodStatus = 'Fresh' | 'At Risk' | 'Spoiled';
export type GasLevel = 'Low' | 'Medium' | 'High';

export interface SensorData {
  id: string;
  name: string;
  type: 'Farm' | 'Warehouse' | 'Transport' | 'Retail';
  temperature: number;
  humidity: number;
  gasLevel: GasLevel;
  timestamp: string;
  status: FoodStatus;
  location?: string;
}

export interface FoodItem {
  id: string;
  name: string;
  category: string;
  addedDate: string;
  expiryDate: string;
  currentStorageId: string;
  spoilageRisk: number; // 0-100
  status: FoodStatus;
  conditions: {
    idealTemp: [number, number];
    idealHumidity: [number, number];
  }
}

export interface Alert {
  id: string;
  storageId: string;
  storageName: string;
  foodName?: string;
  type: 'Temperature' | 'Humidity' | 'Gas' | 'Spoilage';
  severity: 'Warning' | 'Critical';
  message: string;
  timestamp: string;
  resolved: boolean;
}

export const getStatusFromSensors = (temp: number, humidity: number, gas: GasLevel): FoodStatus => {
  if (gas === 'High' || temp > 30 || humidity > 85) return 'Spoiled';
  if (gas === 'Medium' || temp > 25 || humidity > 75) return 'At Risk';
  return 'Fresh';
};

export const mockSensors: SensorData[] = [
  {
    id: 's-simba-01',
    name: 'Main Produce Display',
    type: 'Retail',
    temperature: 14.5,
    humidity: 62,
    gasLevel: 'Low',
    location: 'Simba Town Center',
    timestamp: new Date().toISOString(),
    status: 'Fresh'
  },
  {
    id: 's-simba-02',
    name: 'Dairy Cold Room',
    type: 'Warehouse',
    temperature: 2.8,
    humidity: 35,
    gasLevel: 'Low',
    location: 'Simba Town Center',
    timestamp: new Date().toISOString(),
    status: 'Fresh'
  },
  {
    id: 's-simba-03',
    name: 'Gisenyi Hub Silo',
    type: 'Farm',
    temperature: 24.5,
    humidity: 78,
    gasLevel: 'Medium',
    location: 'Simba Gisenyi',
    timestamp: new Date().toISOString(),
    status: 'At Risk'
  },
  {
    id: 's-simba-04',
    name: 'Delivery Van #09',
    type: 'Transport',
    temperature: 29.2,
    humidity: 88,
    gasLevel: 'High',
    location: 'In Transit',
    timestamp: new Date().toISOString(),
    status: 'Spoiled'
  }
];

export const mockFoodItems: FoodItem[] = [
  {
    id: 'f-simba-01',
    name: 'Fresh Cucumbers',
    category: 'Vegetables',
    addedDate: '2026-03-01T10:00:00Z',
    expiryDate: '2026-03-10T10:00:00Z',
    currentStorageId: 's-simba-01',
    spoilageRisk: 5,
    status: 'Fresh',
    conditions: {
      idealTemp: [10, 15],
      idealHumidity: [60, 70]
    }
  },
  {
    id: 'f-simba-02',
    name: 'Organic Beans',
    category: 'Organic Produce',
    addedDate: '2026-03-02T08:00:00Z',
    expiryDate: '2026-03-12T08:00:00Z',
    currentStorageId: 's-simba-01',
    spoilageRisk: 12,
    status: 'Fresh',
    conditions: {
      idealTemp: [12, 18],
      idealHumidity: [50, 60]
    }
  },
  {
    id: 'f-simba-03',
    name: 'Fresh Milk 1L',
    category: 'Dairy',
    addedDate: '2026-03-02T12:00:00Z',
    expiryDate: '2026-03-09T12:00:00Z',
    currentStorageId: 's-simba-02',
    spoilageRisk: 8,
    status: 'Fresh',
    conditions: {
      idealTemp: [1, 4],
      idealHumidity: [30, 40]
    }
  },
  {
    id: 'f-simba-04',
    name: 'Baby Spinach',
    category: 'Vegetables',
    addedDate: '2026-02-25T12:00:00Z',
    expiryDate: '2026-03-04T12:00:00Z',
    currentStorageId: 's-simba-04',
    spoilageRisk: 98,
    status: 'Spoiled',
    conditions: {
      idealTemp: [1, 3],
      idealHumidity: [80, 90]
    }
  }
];

export const mockAlerts: Alert[] = [
  {
    id: 'a-simba-01',
    storageId: 's-simba-04',
    storageName: 'Delivery Van #09',
    foodName: 'Baby Spinach',
    type: 'Spoilage',
    severity: 'Critical',
    message: 'High gas levels detected in Transit. Immediate action required for Delivery Van #09.',
    timestamp: new Date().toISOString(),
    resolved: false
  },
  {
    id: 'a-simba-02',
    storageId: 's-simba-03',
    storageName: 'Gisenyi Hub Silo',
    foodName: 'Bulk Grain',
    type: 'Humidity',
    severity: 'Warning',
    message: 'Humidity exceeded safe threshold (78%). Risk of mold development.',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    resolved: false
  }
];
