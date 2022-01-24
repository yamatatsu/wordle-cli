#!/usr/bin/env -S deno run --allow-read=./words.txt
import getWords from "./lib/get_words.ts";
import Solver from "./lib/solver.ts";

const words = await getWords();

startGame(words);

async function startGame(words: readonly string[]) {
  const solver = new Solver(words);
  let word = await solver.response();
  console.log(word);

  while (true) {
    const response = prompt()?.toLowerCase().trim().split(",");
    if (!response) {
      continue;
    }
    if (response.every((r) => r === "correct")) {
      console.error(`win:`, word);
      break;
    }
    const feed = word.split("").map((char, i) => ({
      char,
      containing: response[i] === "present",
      exact: response[i] === "correct",
    }));

    solver.addFeed(feed);
    word = await solver.response();
    if (!word) {
      throw new Error(`Failed to solve`);
    }
    console.log(word);
  }
}
