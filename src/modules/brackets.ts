import { IBrackets } from '../interfaces/IBrackets.js';

export function checkBracketsPair(str: string): string {
  const bracketsPair: IBrackets = {
    '(': ')',
    '[': ']',
    '{': '}',
  };

  const brackets = str
    .split('')
    .filter(
      (letter) =>
        letter === '(' || letter === ')' || letter === '[' || letter === ']' || letter === '{' || letter === '}',
    );

  const initialBracketsLength = brackets.length;

  for (let j = 0; j < initialBracketsLength; j++) {
    for (let i = 0; i < brackets.length; i++) {
      if (brackets[i + 1] !== undefined) {
        if (bracketsPair[brackets[i]] === brackets[i + 1]) {
          brackets.splice(i, 2);
        }
      }
    }
  }

  if (brackets.length === 0) {
    return 'Correct \n';
  } else {
    return 'Incorrect \n';
  }
}
