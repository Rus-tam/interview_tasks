export function* nonFibGenerator(N: number) {
  let currentNumber = 0;
  let nextNumber = 1;
  let estNumber = 1;
  const fibArr: number[] = [];

  let n = 0;
  let i = 0;
  let m = 0;

  while (n < N) {
    if (estNumber === currentNumber + nextNumber && nextNumber - currentNumber > 2) {
      for (let iter = currentNumber + 1; iter < nextNumber; iter++) {
        yield iter;
      }
    }
    i = nextNumber;
    currentNumber = nextNumber;
    nextNumber = estNumber;
    estNumber = i + estNumber;
    n++;
  }
}

const fib = nonFibGenerator(10);

for (let l = 0; l < 10; l++) {
  console.log(fib.next());
}
