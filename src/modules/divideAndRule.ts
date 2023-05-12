import * as readline from 'readline';
import { Interface } from 'readline';

export class DivideAndRule {
  reader: Interface;
  private wordsAmount: number;
  private stringAmount: number;
  private words: string[];
  private strings: string[];
  constructor() {
    this.reader = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    this.stringAmount = 0;
    this.wordsAmount = 0;
    this.words = [];
    this.strings = [];
  }

  private question(theQuestion: string): Promise<string> {
    return new Promise((resolve) => this.reader.question(theQuestion, (answer) => resolve(answer)));
  }

  private async setNumber(question: string): Promise<number> {
    return Number(await this.question(question));
  }

  private async setString(question: string, numberOfStr: number): Promise<string[]> {
    const strings: string[] = [];
    for (let i = 0; i < numberOfStr; i++) {
      const string = await this.question(`${question} ${i + 1}: `);
      strings.push(string.toLowerCase());
    }
    return strings;
  }

  private async setInitialData(): Promise<void> {
    this.wordsAmount = await this.setNumber('Введите количество слов: ');
    this.words = await this.setString('Введите слово', this.wordsAmount);

    this.stringAmount = await this.setNumber('Введите количество строк: ');
    this.strings = await this.setString('Введите строку', this.stringAmount);
  }

  public async findConcatenation(): Promise<void> {
    await this.setInitialData();
    for (let word of this.words) {
      for (let element of this.words) {
        let variant1 = word + element;
        let variant2 = element + word;
        if (this.strings.includes(variant1)) {
          console.log(`Строка полученная конкатенацией: ${variant1}`);
        }
        if (this.strings.includes(variant2)) {
          console.log(`Строка полученная конкатенацией: ${variant2}`);
        }
        this.reader.close();
      }
    }
  }
}

const item = new DivideAndRule();

item.findConcatenation();
