import { useCache } from '@/hooks/usePerformance';

// API Cache Manager
export class ApiCacheManager {
  private static instance: ApiCacheManager;
  private cache = new Map<string, { data: any; timestamp: number; ttl: number }>();

  static getInstance(): ApiCacheManager {
    if (!ApiCacheManager.instance) {
      ApiCacheManager.instance = new ApiCacheManager();
    }
    return ApiCacheManager.instance;
  }

  set(key: string, data: any, ttl: number = 5 * 60 * 1000): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl
    });
  }

  get(key: string): any | null {
    const item = this.cache.get(key);
    if (!item) return null;

    const now = Date.now();
    if (now - item.timestamp > item.ttl) {
      this.cache.delete(key);
      return null;
    }

    return item.data;
  }

  clear(): void {
    this.cache.clear();
  }

  delete(key: string): void {
    this.cache.delete(key);
  }

  has(key: string): boolean {
    const item = this.cache.get(key);
    if (!item) return false;

    const now = Date.now();
    if (now - item.timestamp > item.ttl) {
      this.cache.delete(key);
      return false;
    }

    return true;
  }

  size(): number {
    return this.cache.size;
  }
}

// Component Cache Hook
export const useComponentCache = (componentName: string) => {
  const cacheManager = ApiCacheManager.getInstance();
  
  const cacheKey = `component_${componentName}`;
  
  const getCachedData = (key: string) => {
    return cacheManager.get(`${cacheKey}_${key}`);
  };

  const setCachedData = (key: string, data: any, ttl?: number) => {
    cacheManager.set(`${cacheKey}_${key}`, data, ttl);
  };

  const clearCache = () => {
    // Clear all component-specific cache entries
    const keys = Array.from(cacheManager['cache'].keys());
    keys.forEach(key => {
      if (key.startsWith(cacheKey)) {
        cacheManager.delete(key);
      }
    });
  };

  return {
    getCachedData,
    setCachedData,
    clearCache
  };
};

// Image Cache Hook
export const useImageCache = () => {
  const cacheManager = ApiCacheManager.getInstance();
  
  const preloadImage = (src: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        cacheManager.set(`image_${src}`, true, 24 * 60 * 60 * 1000); // 24 hours
        resolve();
      };
      img.onerror = reject;
      img.src = src;
    });
  };

  const isImageCached = (src: string): boolean => {
    return cacheManager.has(`image_${src}`);
  };

  return {
    preloadImage,
    isImageCached
  };
};

// API Response Cache Hook
export const useApiCache = (endpoint: string) => {
  const cacheManager = ApiCacheManager.getInstance();
  const cacheKey = `api_${endpoint}`;
  
  const getCachedResponse = () => {
    return cacheManager.get(cacheKey);
  };

  const setCachedResponse = (data: any, ttl: number = 5 * 60 * 1000) => {
    cacheManager.set(cacheKey, data, ttl);
  };

  const clearCachedResponse = () => {
    cacheManager.delete(cacheKey);
  };

  return {
    getCachedResponse,
    setCachedResponse,
    clearCachedResponse
  };
};

// Local Storage Cache Hook
export const useLocalStorageCache = (key: string, ttl: number = 24 * 60 * 60 * 1000) => {
  const getCachedData = () => {
    try {
      const item = localStorage.getItem(key);
      if (!item) return null;

      const { data, timestamp } = JSON.parse(item);
      const now = Date.now();

      if (now - timestamp > ttl) {
        localStorage.removeItem(key);
        return null;
      }

      return data;
    } catch (error) {
      console.warn('Error reading from localStorage:', error);
      return null;
    }
  };

  const setCachedData = (data: any) => {
    try {
      const item = JSON.stringify({
        data,
        timestamp: Date.now()
      });
      localStorage.setItem(key, item);
    } catch (error) {
      console.warn('Error writing to localStorage:', error);
    }
  };

  const clearCachedData = () => {
    localStorage.removeItem(key);
  };

  return {
    getCachedData,
    setCachedData,
    clearCachedData
  };
};

// Cache Statistics Hook
export const useCacheStats = () => {
  const cacheManager = ApiCacheManager.getInstance();
  
  const getStats = () => {
    const cache = cacheManager['cache'];
    const now = Date.now();
    
    let totalSize = 0;
    let expiredCount = 0;
    let validCount = 0;
    
    cache.forEach((item, key) => {
      totalSize += JSON.stringify(item.data).length;
      
      if (now - item.timestamp > item.ttl) {
        expiredCount++;
      } else {
        validCount++;
      }
    });

    return {
      totalEntries: cache.size,
      validEntries: validCount,
      expiredEntries: expiredCount,
      totalSize: `${(totalSize / 1024).toFixed(2)} KB`,
      hitRate: validCount / cache.size || 0
    };
  };

  return { getStats };
};
