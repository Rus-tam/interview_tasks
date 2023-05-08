export function* nonFibGenerator(N: number) {
  let currentNumber = 0;
  let nextNumber = 1;
  let estNumber = 1;
  const fibArr: number[] = [];

  let n = 0;
  let i = 0;
  let m = 0;

  while (n <= N) {
    if (estNumber === currentNumber + nextNumber) {
      fibArr.push(currentNumber);
    }
    i = nextNumber;
    currentNumber = nextNumber;
    nextNumber = estNumber;
    estNumber = i + estNumber;
    n++;

    if (fibArr.length > 10) {
      m++;
      if (!fibArr.includes(m)) {
        yield m;
      }
      fibArr.length > 100 ? fibArr.splice(0, 10) : null;
    }
  }
}

const fib = nonFibGenerator(2000);

for (let l = 0; l < 1000; l++) {
  console.log(fib.next());
}
