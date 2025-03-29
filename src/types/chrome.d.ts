// Extend global scope with StorageItems interface for Chrome storage API
interface StorageItems {
  autoMute?: boolean;
  [key: string]: any;
} 