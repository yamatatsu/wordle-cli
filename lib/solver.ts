import Logger from "./logger.ts";
import { EstimatedResult } from "./questioner.ts";

export default class Solver {
  private history: EstimatedResult[][] = [];
  constructor(private words: readonly string[]) {}

  public response() {
    // const [head, ...tail] = this.words;
    const candidates = this.words.filter(this.createFilter());
    Logger.debug("candidates:", candidates.length);
    const [head, ...tail] = candidates;
    this.words = tail;
    return head;
  }
  public addFeed(result: EstimatedResult[]) {
    this.history.push(result);
  }

  private createFilter() {
    if (this.history.length === 0) {
      return () => true;
    }

    const notContainingChars = this.history.flat().reduce(
      (acc, { containing, char }) => {
        if (containing) return acc;
        if (acc.includes(char)) return acc;
        return acc + char;
      },
      "",
    );
    const containingRegex = this.history.flat()
      .reduce(
        (acc, { containing, char }) => {
          if (!containing) return acc;
          if (acc.includes(char)) return acc;
          return [...acc, char];
        },
        [] as string[],
      ).reduce(
        (acc, char) => {
          return acc + `(?=.*${char})`;
        },
        "",
      );

    const exactRegex = range(5).map((i) => {
      for (const result of this.history) {
        if (result[i].exact) {
          return result[i].char;
        }
        return `[^${notContainingChars}]`;
      }
    }).join("");

    const regex = new RegExp(`${containingRegex}(${exactRegex})`);

    return function filter(word: string): boolean {
      return regex.test(word);
    };
  }
}

function range(len: number) {
  return [...Array(len).keys()];
}
