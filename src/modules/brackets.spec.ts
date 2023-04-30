import { checkBracketsPair } from './brackets.ts';

describe('Testing checkBracketsPair function', () => {
  test('Should check the pairing of parentheses and receive `Correct`', () => {
    expect(checkBracketsPair('fhgjf(gjkd[90tifj]gjfkd)')).toBe('Correct \n');
  });

  test('Should check the pairing of parentheses and receive `Incorrect`', () => {
    expect(checkBracketsPair('({ghfjsrit)}')).toBe('Incorrect \n');
  });
});
