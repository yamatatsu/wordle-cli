import { EstimatedResult } from "./questioner.ts";

export default class Solver {
  private history: EstimatedResult[][] = [];
  constructor(private words: readonly string[]) {}

  public response() {
    // const [head, ...tail] = this.words;
    const candidates = this.words.filter(this.createFilter());
    const [head, ...tail] = candidates;
    this.words = tail;
    return head;
  }
  public addFeed(result: EstimatedResult[]) {
    this.history.push(result);
  }

  private createFilter() {
    const notContainingChars = this.history.flat().reduce(
      (acc, { containing, char }) => {
        if (containing) return acc;
        if (acc.includes(char)) return acc;
        return acc + char;
      },
      "",
    );
    const containingChars = this.history.flat().reduce(
      (acc, { containing, char }) => {
        if (!containing) return acc;
        if (acc.includes(char)) return acc;
        return [...acc, char];
      },
      [] as string[],
    );

    const exactRegExp = new RegExp(
      range(5).map((i) => {
        for (const result of this.history) {
          if (result[i].exact) {
            return result[i].char;
          }
          return `[^${notContainingChars}]`;
        }
      }).join(""),
    );

    return function filter(word: string): boolean {
      return containingChars.every((char) => word.includes(char)) &&
        exactRegExp.test(word);
    };
  }
}

function range(len: number) {
  return [...Array(len).keys()];
}
