export function* nonFibGenerator(N: number) {
  let currentNumber = 0;
  let nextNumber = 1;
  let estNumber = 1;
  let counter = 0;
  let tempNextNumber = 0;

  while (counter < N) {
    if (estNumber === currentNumber + nextNumber && nextNumber - currentNumber > 2) {
      for (let iter = currentNumber + 1; iter < nextNumber; iter++) {
        yield iter;
      }
    }
    tempNextNumber = nextNumber;
    currentNumber = nextNumber;
    nextNumber = estNumber;
    estNumber = tempNextNumber + estNumber;
    counter++;
  }
}
