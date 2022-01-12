#!/usr/bin/env -S deno run --allow-read=./words.txt
import getWords from "./lib/get_words.ts";
import selectRandomly from "./lib/select_randomly.ts";
import Questioner, { EstimatedResult } from "./lib/questioner.ts";
import Assistant from "./lib/assistant.ts";
import * as Color from "./lib/color.ts";

const words = await getWords();

startGame(words);

function startGame(words: readonly string[]) {
  const answer = selectRandomly(words);
  const questioner = new Questioner(words, answer);
  const assistant = new Assistant();

  let turn = 0;

  while (true) {
    turn++;
    const input = prompt("Please enter input")?.toLowerCase();

    const result = questioner.judge(input);

    if (result.type === "invalid") {
      console.info(result.message);
      continue;
    }

    console.info(color(result.result));
    assistant.getEstimatedResults(result.result);

    if (result.type === "solved") {
      console.info("congrats!! turn:", turn);
      return turn;
    } else {
      console.info("Hint:", assistant.sayHint());
    }
  }
}

function color(estimatedResults: EstimatedResult[]): string {
  return estimatedResults.map(({ char, containing, exact }) => {
    if (exact) {
      return Color.exact(char);
    }
    if (containing) {
      return Color.containing(char);
    }
    return Color.notContaining(char);
  }).join("");
}
