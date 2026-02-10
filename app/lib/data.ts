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
    id: 's1',
    name: 'Cold Storage A',
    type: 'Warehouse',
    temperature: 4.2,
    humidity: 45,
    gasLevel: 'Low',
    timestamp: new Date().toISOString(),
    status: 'Fresh'
  },
  {
    id: 's2',
    name: 'Transport Truck #42',
    type: 'Transport',
    temperature: 18.5,
    humidity: 65,
    gasLevel: 'Medium',
    timestamp: new Date().toISOString(),
    status: 'At Risk'
  },
  {
    id: 's3',
    name: 'Local Farm Silo 1',
    type: 'Farm',
    temperature: 28.1,
    humidity: 82,
    gasLevel: 'High',
    timestamp: new Date().toISOString(),
    status: 'Spoiled'
  },
  {
    id: 's4',
    name: 'Pantry Shelf 2',
    type: 'Retail',
    temperature: 22.0,
    humidity: 50,
    gasLevel: 'Low',
    timestamp: new Date().toISOString(),
    status: 'Fresh'
  }
];

export const mockFoodItems: FoodItem[] = [
  {
    id: 'f1',
    name: 'Organic Strawberries',
    category: 'Fruit',
    addedDate: '2026-02-08T10:00:00Z',
    expiryDate: '2026-02-15T10:00:00Z',
    currentStorageId: 's1',
    spoilageRisk: 15,
    status: 'Fresh',
    conditions: {
      idealTemp: [2, 5],
      idealHumidity: [40, 50]
    }
  },
  {
    id: 'f2',
    name: 'Fresh Milk',
    category: 'Dairy',
    addedDate: '2026-02-09T08:00:00Z',
    expiryDate: '2026-02-16T08:00:00Z',
    currentStorageId: 's2',
    spoilageRisk: 65,
    status: 'At Risk',
    conditions: {
      idealTemp: [1, 4],
      idealHumidity: [30, 40]
    }
  },
  {
    id: 'f3',
    name: 'Baby Spinach',
    category: 'Vegetables',
    addedDate: '2026-02-05T12:00:00Z',
    expiryDate: '2026-02-12T12:00:00Z',
    currentStorageId: 's3',
    spoilageRisk: 95,
    status: 'Spoiled',
    conditions: {
      idealTemp: [1, 3],
      idealHumidity: [80, 90]
    }
  }
];

export const mockAlerts: Alert[] = [
  {
    id: 'a1',
    storageId: 's3',
    storageName: 'Local Farm Silo 1',
    foodName: 'Baby Spinach',
    type: 'Spoilage',
    severity: 'Critical',
    message: 'High gas levels detected. Potential spoilage in progress.',
    timestamp: new Date().toISOString(),
    resolved: false
  },
  {
    id: 'a2',
    storageId: 's2',
    storageName: 'Transport Truck #42',
    foodName: 'Fresh Milk',
    type: 'Temperature',
    severity: 'Warning',
    message: 'Temperature exceeded threshold (18.5°C).',
    timestamp: new Date().toISOString(),
    resolved: false
  }
];
