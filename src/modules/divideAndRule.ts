import * as readline from 'readline';
import { Interface } from 'readline';
import { IResultC4 } from '../interfaces/IResultC4.ts';

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
    const count: IResultC4 = {};
    await this.setInitialData();

    // Сложное мудренное решение
    for (const word of this.words) {
      for (const element of this.words) {
        const variant1 = word + element;
        const variant2 = element + word;
        if (this.strings.includes(variant1)) {
          count[variant1] === undefined
            ? (count[variant1] = { variantCount: 0, variantString: '', variants: [] })
            : null;
          if (!count[variant1].variants.includes(`${word}:${element}`)) {
            count[variant1].variants.push(`${word}:${element}`);
            count[variant1].variantString = count[variant1].variantString + ' ' + `${word}:${element}`;
            count[variant1].variantCount++;
          }
        }
        if (this.strings.includes(variant2)) {
          count[variant2] === undefined
            ? (count[variant2] = { variantCount: 0, variantString: '', variants: [] })
            : null;
          if (!count[variant2].variants.includes(`${element}:${word}`)) {
            count[variant2].variants.push(`${element}:${word}`);
            count[variant2].variantString = count[variant2].variantString + ' ' + `${element}:${word}`;
            count[variant2].variantCount++;
          }
        }
      }
    }
    console.log('Результаты: ');
    for (const item of Object.keys(count)) {
      console.log(`${count[item].variantCount}${count[item].variantString}`);
    }

    this.reader.close();
  }
}
