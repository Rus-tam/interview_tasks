import * as readline from 'readline';
import { Interface } from 'readline';

export class DivideAndRule {
  rl: Interface;
  wordsAmount: number;
  words: string[];
  constructor() {
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    this.wordsAmount = 0;
    this.words = [];
  }

  public enterNumberOfWords() {
    this.rl.question('Введите количество слов: ', (answer: string) => {
      this.wordsAmount = Number(answer);
      this.enterWords();
    });
  }

  private enterWords() {
    this.rl.question('Введите слово ', (answer: string) => {
      this.words.push(answer.trim());
      if (this.words.length === this.wordsAmount) {
        // this.rl.close();
      } else {
        this.enterWords();
      }
    });
  }
}

const item = new DivideAndRule();

item.enterNumberOfWords();
