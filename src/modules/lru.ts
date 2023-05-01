export class Cache<T> {
  readonly maxSize: number;
  public ageCounter: Map<string, number>;
  private cache: Map<string, T>;
  constructor(maxAge: number) {
    this.maxSize = maxAge;
    this.cache = new Map();
    this.ageCounter = new Map();
  }

  public proxyMethod(key: string, fn: (...arg0: T[]) => T, ...arg: T[]): T {
    const value = this.getValue(key);

    if (value) {
      return value;
    } else {
      const fnResult = fn(...arg);
      this.setItem(key, fnResult);
      return fnResult;
    }
  }

  public getValue(key: string): T | undefined {
    const value = this.cache.get(key);
    if (value) {
      this.ageCounter.set(key, 0);
      this.increaseAgeCounterValue(key);
      this.deleteItemWithMaxAgeCounterValue();
    }
    return value;
  }

  public setItem(key: string, value: T): void {
    if (!this.cache.has(key)) {
      this.cache.set(key, value);
      this.ageCounter.set(key, 0);
      this.increaseAgeCounterValue(key);
      this.deleteItemWithMaxAgeCounterValue();
    }
  }

  // Метод увеличивает счетчик давности для всех ключей, кроме заданного
  private increaseAgeCounterValue(key: string) {
    for (const item of this.ageCounter.keys()) {
      item !== key ? this.ageCounter.set(item, (this.ageCounter.get(item) ?? 0) + 1) : null;
    }
  }

  //   Метод удаляет запись с максимальным значением счетчика давности
  private deleteItemWithMaxAgeCounterValue() {
    let maxKey = '';
    this.ageCounter.forEach((value, key) => {
      if (value > this.maxSize) {
        maxKey = key;
      }
    });
    maxKey !== '' ? this.ageCounter.delete(maxKey) && this.cache.delete(maxKey) : null;
  }
}
