import { checkBracketsPair } from './modules/brackets.ts';
import { nonFibGenerator } from './modules/nonFibGenerator.ts';
import { DivideAndRule } from './modules/divideAndRule.ts';
import { Cache } from './modules/cache.ts';

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

  process.stdout.write('\n');
  process.stdout.write('ПРОВЕРКА ЗАДАНИЯ B1 \n \n');
  const cache = new Cache<number>(5);
  const proxyFunction = (...args: number[]) => {
    return args[0] * args[1];
  };
  for (let i = 0; i < 7; i++) {
    cache.proxyMethod(`${i}`, proxyFunction, [i, i * 2]);
    cache.getValue('1');
    console.log(cache.cache);
    console.log(' ');
  }

  process.stdout.write('\n');
  process.stdout.write('ПРОВЕРКА ЗАДАНИЯ C4 \n \n');
  const instance = new DivideAndRule();
  instance.findConcatenation();
}

main();
