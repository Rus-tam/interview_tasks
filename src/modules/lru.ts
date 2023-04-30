export class LRU_cache<T> {
  private maxCacheSize: number;
  private cache: Map<string, T>;
  constructor(maxCacheSize: number) {
    this.maxCacheSize = maxCacheSize;
    this.cache = new Map();
  }

  public getItem(key: string): T | undefined {
    return this.cache.get(key);
  }
}
