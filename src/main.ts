import { checkBracketsPair } from './modules/brackets.js';

// A1. Скобки
process.stdout.write('Введите строку содержащую скобки типа `()`, `{}`, `[]` \n');
process.stdin.on('data', function (data: Buffer) {
  const str = data.toString();
  const resultA1 = checkBracketsPair(str);
  process.stdout.write(`${resultA1}`);
  process.exit();
});
