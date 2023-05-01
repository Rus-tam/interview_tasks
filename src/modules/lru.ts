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
    }
    return value;
  }

  public setItem(key: string, value: T) {
    if (!this.cache.has(key)) {
      this.cache.set(key, value);
      this.ageCounter.set(key, 0);
      this.increaseAgeCounterValue(key);
    }
  }

  // Метод увеличивает счетчик давности для всех ключей, кроме заданного
  private increaseAgeCounterValue(key: string) {
    //   Находим все ключи объекта ageCounter
    const allKeys = [...this.ageCounter.keys()];
    //   Удаляем из массива allKeys заданный для этого метода ключ
    const currentKeyIndex = allKeys.indexOf(key);
    allKeys.splice(currentKeyIndex, 1);
    // Увеличиваем на 1 значения счетчика давности для всех ключей
    for (let item of allKeys) {
      this.ageCounter.set(item, (this.ageCounter.get(item) ?? 0) + 1);
    }
  }
}

const cache = new Cache<number>(10);

cache.setItem('1', 11);
console.log(cache.ageCounter);
cache.setItem('2', 22);
console.log(cache.ageCounter);
cache.setItem('3', 33);
console.log(cache.ageCounter);
console.log('=====================');
console.log(' ');

cache.getValue('1');
console.log(cache.ageCounter);
