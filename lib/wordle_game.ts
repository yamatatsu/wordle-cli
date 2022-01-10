import * as Color from "./color.ts";
import Questioner from "./questioner.ts";
import Assistant from "./assistant.ts";

type EstimatedResult = {
  char: string;
  containing: boolean;
  same: boolean;
};

type Solver = {
  response: () => string | undefined;
};

export default function startGame(words: readonly string[], solver: Solver) {
  const questioner = new Questioner(words);
  const assistant = new Assistant();

  let turn = 0;

  while (true) {
    turn++;
    const input = solver.response();

    const result = questioner.judge(input);

    if (result.type === "invalid") {
      console.info(result.message);
      if (result.message === "empty!") {
        return Infinity.valueOf();
      }
      continue;
    }

    // console.info(color(result.result));
    assistant.getEstimatedResults(result.result);

    if (result.type === "solved") {
      console.info("congrats!! turn:", turn);
      return turn;
    } else {
      // console.info("Hint:", assistant.sayHint());
    }
  }
}

function color(estimatedResults: EstimatedResult[]): string {
  return estimatedResults.map(({ char, containing, same }) => {
    if (same) {
      return Color.exact(char);
    }
    if (containing) {
      return Color.containing(char);
    }
    return Color.notContaining(char);
  }).join("");
}
