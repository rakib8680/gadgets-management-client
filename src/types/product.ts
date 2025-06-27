export type TCategory =
  | "smartphone"
  | "tablet"
  | "laptop"
  | "smartwatch"
  | "headphone"
  | "speaker"
  | "accessory";
export type TOperatingSystem =
  | "iOS"
  | "Android"
  | "Windows"
  | "macOS"
  | "Linux";
export type TConnectivity =
  | "WiFi"
  | "Bluetooth"
  | "NFC"
  | "GPS"
  | "4G"
  | "5G"
  | "USB"
  | "HDMI"
  | "Thunderbolt";

export type TPowerSource = "Battery" | "Plug-in" | "Battery & Plug-in";

export type TFeature = {
  // cameraResolution?: string;
  // storageCapacity?: string;
  // screenSize?: string;
  [key: string]: string | number | boolean;
};

export type TDimensions = {
  width: number;
  height: number;
  depth: number;
};

export type TProduct = {
  _id: string;
  name: string;
  price: number;
  imageURL: string;
  seller_id: string;
  quantity: number;
  releaseDate: Date;
  brand: string;
  modelNo: string;
  category: TCategory;
  operatingSystem?: TOperatingSystem;
  connectivity: TConnectivity[];
  powerSource: TPowerSource;
  features: TFeature;
  weight?: number;
  dimensions?: TDimensions;
  compatibility?: string[];
};

export type TMeta = {
  limit: number;
  page: number;
  total: number;
  totalPage: number;
};
