import { Cache } from './cache.ts';
import { beforeEach } from '@jest/globals';

describe('Testing Cache class', () => {
  let cache: Cache<number>;
  const proxyFunction = (...args: number[]): number => {
    let sum = 0;
    args.forEach((item) => (sum = sum + item));
    return sum;
  };

  beforeEach(() => {
    cache = new Cache<number>(4);
  });

  test('Should set result of proxy function to cache', () => {
    const value = cache.proxyMethod('first', proxyFunction, [2, 4, 5]);
    expect(value).toEqual(11);
  });
});
