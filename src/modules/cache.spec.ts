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
    cache.proxyMethod('first', proxyFunction, [2, 4, 5]);
    const value = cache.getValue('first');
    expect(value).toEqual(11);
  });

  test('Should increase ageCounter value for non-called item after every getValue method call', () => {
    cache.proxyMethod('first', proxyFunction, [1, 2, 3]);
    cache.proxyMethod('second', proxyFunction, [1, 2, 3]);
    cache.getValue('first');
    cache.getValue('first');
    expect(cache.ageCounter.get('second')).toEqual(2);
  });

  test('Should set 0 for ageCounter value for called key', () => {
    cache.proxyMethod('first', proxyFunction, [1, 2, 3]);
    cache.getValue('first');
    cache.getValue('first');
    expect(cache.ageCounter.get('second'));
  });

  test('Should delete item with ageCounter value greater than maxSize', () => {
    cache.proxyMethod('first', proxyFunction, [1, 2, 3]);
    cache.proxyMethod('second', proxyFunction, [3, 4, 5]);
    cache.proxyMethod('third', proxyFunction, [6, 7, 8]);
    cache.proxyMethod('fourth', proxyFunction, [9, 10, 11]);
    cache.proxyMethod('fifth', proxyFunction, [12, 13, 14]);

    cache.getValue('second');
    cache.getValue('third');
    cache.getValue('third');
    cache.getValue('fourth');
    cache.getValue('fifth');

    expect(cache.getValue('first')).toBe(undefined);
  });
});
