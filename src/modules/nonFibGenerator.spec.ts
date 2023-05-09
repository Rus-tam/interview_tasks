import { nonFibGenerator } from './nonFibGenerator.ts';

describe('Testing non-Fibonacci numbers', () => {
  const initialNonFibArr: number[] = [4, 6, 7, 9, 10, 11, 12, 14, 15, 16];
  const initialFibArr: number[] = [0, 1, 1, 2, 3, 5, 8, 13, 21, 34];
  const N: number = 10;
  const nonFibArray: number[] = [];
  const fibArray: number[] = [];
  beforeEach(() => {
    const nonFib = nonFibGenerator(N);

    for (let i = 0; i < N; i++) {
      let value = nonFib.next().value;
      typeof value === 'number' ? nonFibArray.push(value) : null;
    }
  });

  test('Should be an array of first 10 non-Fibonacci numbers', () => {
    expect(nonFibArray).toEqual(initialNonFibArr);
  });

  test('Should be not an array of first 10 Fibonacci numbers', () => {
    expect(nonFibArray).not.toEqual(initialFibArr);
  });
});
