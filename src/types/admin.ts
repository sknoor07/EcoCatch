export interface Plant {
  id: number;
  name: string;
  owner: string;
  location?: string | null;
  capacityKw?: number | null;
  status?: string | null;
  createdAt?: string | Date | null;
}

export interface Machine {
  id: number;
  plantId: number;
  name: string;
  type: string;
  status?: string | null;
  installedAt?: string | Date | null;
  lastMaintenance?: string | Date | null;
}

export interface SensorReading {
  id: number;
  machineId: number;
  sensorType: string;
  value: number;
  unit: string;
  timestamp: string | Date;
}

// Add this to your existing src/types/admin.ts
export interface Product {
  id: number;
  slug: string;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  longDescription: string | null;
  productType: string;
  features: string[];
  specs: { label: string; value: string }[] | null;
  applications: string[] | null;
  image: string | null;
  brand: string | null;
  brandOrigin: string | null;
  category: string;
  isActive: boolean;
  createdAt: Date | null;
  updatedAt: Date | null;
}

export interface Contact {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  selectedProducts: {
    id: number;
    name: string;
  }[];
  isRead: boolean | null;
  isImportant: boolean | null;
  createdAt: string;
}

export interface ContactReply {
  id: number;
  sentBy: string;
  message: string;
  createdAt: string;
}