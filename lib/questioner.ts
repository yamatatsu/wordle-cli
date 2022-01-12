export type EstimatedResult = {
  char: string;
  containing: boolean;
  exact: boolean;
};

type JudgeResult =
  | {
    type: "invalid";
    message: string;
  }
  | {
    type: "unsolved";
    result: EstimatedResult[];
  }
  | {
    type: "solved";
    result: EstimatedResult[];
  };

export default class Questioner {
  constructor(
    private readonly words: readonly string[],
    private readonly answer: string,
  ) {}

  public judge(input: string | undefined): JudgeResult {
    if (!input) {
      return { type: "invalid", message: "empty!" };
    }
    if (input.length !== 5) {
      return { type: "invalid", message: "not 5 length!" };
    }
    if (!/[a-zA-Z]{5}/.test(input)) {
      return { type: "invalid", message: "not alphabet!" };
    }
    if (!this.words.includes(input)) {
      return { type: "invalid", message: "not exists word!" };
    }

    const estimatedResult = this.estimate(input);

    return {
      type: isSolved(estimatedResult) ? "solved" : "unsolved",
      result: estimatedResult,
    };
  }

  private estimate(input: string): EstimatedResult[] {
    return input.split("").map((c, i): EstimatedResult => {
      const containing = this.answer.includes(c);
      const exact = c === this.answer.charAt(i);
      return { char: c, containing, exact };
    });
  }
}

function isSolved(estimatedResult: EstimatedResult[]): boolean {
  return estimatedResult.every(({ exact }) => exact);
}
