export class Cache<T> {
  private maxAge: number;
  public ageCounter: Map<string, number>;
  private cache: Map<string, T>;
  constructor(maxAge: number) {
    this.maxAge = maxAge;
    this.cache = new Map();
    this.ageCounter = new Map();
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
    let maxKey: string = '';
    this.ageCounter.forEach((value, key) => {
      if (value > this.maxAge) {
        maxKey = key;
      }
    });
    maxKey !== '' ? this.ageCounter.delete(maxKey) && this.cache.delete(maxKey) : null;
  }
}

const cache = new Cache<number>(2);

cache.setItem('1', 11);
console.log(cache.ageCounter);
cache.setItem('2', 22);
console.log(cache.ageCounter);
cache.setItem('3', 33);
console.log(cache.ageCounter);
cache.setItem('4', 44);
console.log(cache.ageCounter);
console.log('=====================');
console.log(' ');

cache.getValue('1');
console.log(cache.ageCounter);
