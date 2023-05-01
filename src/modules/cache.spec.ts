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
});
