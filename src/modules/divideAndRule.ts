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

  private async setString(question: string): Promise<string[]> {
    const strings: string[] = [];
    for (let i = 0; i < this.wordsAmount; i++) {
      const word = await this.question(`${question} ${i + 1}: `);
      strings.push(word);
    }
    return strings;
  }

  public async getInitialData(): Promise<void> {
    this.wordsAmount = await this.setNumber('Введите количество слов: ');
    this.words = await this.setString('Введите слово');

    this.stringAmount = await this.setNumber('Введите количество строк: ');
    this.strings = await this.setString('Введите строку');
  }
}

const item = new DivideAndRule();

item.getInitialData();
