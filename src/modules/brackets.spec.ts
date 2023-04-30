import { checkBracketsPair } from './brackets.ts';
import exp from 'constants';

describe('Testing checkBracketsPair function', () => {
  test('Should check the pairing of parentheses and receive `Correct`', () => {
    expect(checkBracketsPair('bla-bla(bla[90bla]bla-bla-bla/)')).toBe('Correct \n');
  });

  test('Should check the pairing of parentheses and receive `Incorrect`', () => {
    expect(checkBracketsPair('({bla_bla_bla)}')).toBe('Incorrect \n');
  });

  test('Should check the pairing of parentheses and receive `Incorrect`', () => {
    expect(checkBracketsPair('(17272(bla-bla)')).toBe('Incorrect \n');
  });

  test('Should check the pairing of parentheses and receive `Incorrect`', () => {
    expect(checkBracketsPair('(123[bla)bla]bla'));
  });

  test('Should check the pairing of parentheses and receive `Correct`', () => {
    expect(checkBracketsPair('{bla(bla-bla[123])}')).toBe('Correct \n');
  });

  test('Should check the pairing of parentheses and receive `Correct`', () => {
    expect(checkBracketsPair('[{}()]')).toBe('Correct \n');
  });
});
