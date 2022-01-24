import { readLines } from "https://deno.land/std/io/mod.ts";
import Solver from "./lib/solver.ts";
import _words from "./words.json" assert { type: "json" };

const words = Object.freeze(_words.map((w) => w.toLowerCase()));

startGame(words);

async function startGame(words: readonly string[]) {
  const solver = new Solver(words);
  let word = await solver.response();
  console.log(word);

  for await (const line of readLines(Deno.stdin)) {
    const response = line.toLowerCase().trim().split(",");
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
