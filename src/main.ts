import { checkBracketsPair } from './modules/brackets.ts';
import { nonFibGenerator } from './modules/nonFibGenerator.ts';

// A1. Скобки
function getInputA1(): Promise<string> {
  return new Promise((resolve) => {
    process.stdout.write('ПРОВЕРКА ЗАДАНИЯ А1 \n \n');
    process.stdout.write('Введите строку содержащую скобки типа `()`, `{}`, `[]` \n');
    process.stdin.once('data', (data: Buffer) => {
      resolve(data.toString());
    });
  });
}
function outputA1A2(result: string): void {
  process.stdout.write(`${result} \n`);
}

// A2. (Не) Фибоначчи
function getInputA2(): Promise<number> {
  return new Promise((resolve): void => {
    process.stdout.write('\n');
    process.stdout.write('ПРОВЕРКА ЗАДАНИЯ A2 \n \n');
    process.stdout.write('Введите размер последовательности чисел не относящихся к последовательности Фибоначчи \n');
    process.stdin.once('data', (data: Buffer) => {
      resolve(Number(data));
    });
  });
}

async function main(): Promise<void> {
  const inputA1 = await getInputA1();
  const resultA1 = checkBracketsPair(inputA1);
  outputA1A2(resultA1);

  const inputA2 = await getInputA2();
  const nonFib = nonFibGenerator(inputA2);
  for (let i = 0; i < inputA2; i++) {
    const value: number | void = nonFib.next().value;
    typeof value === 'number' ? outputA1A2(value.toString()) : null;
  }
}

main();
