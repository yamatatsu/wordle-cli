#!/usr/bin/env -S deno run --allow-read=./words.txt
import getWords from "./lib/get_words.ts";
import Solver from "./lib/solver.ts";
import Questioner from "./lib/questioner.ts";

const trialNum = /\d+/.test(Deno.args[0]) ? Number(Deno.args[0]) : 10;

console.info(`Try ${trialNum}!`);

const words = await getWords();

// Game Start
const turns = range(trialNum).map(() => {
  const solver = new Solver(words);
  return startGame(words, solver);
}).sort((a, b) => a > b ? 1 : -1);

// Results
console.info("min:", min(turns));
console.info("max:", max(turns));
console.info("mean:", mean(turns));
console.info("median:", median(turns));

/////////////////

function startGame(words: readonly string[], solver: Solver) {
  const questioner = new Questioner(words);

  let turn = 0;

  while (true) {
    turn++;
    const input = solver.response();

    const result = questioner.judge(input);

    if (result.type === "unsolved") {
      solver.addFeed(result.result);
      continue;
    }

    if (result.type === "solved") {
      console.info("congrats!! turn:", turn);
      return turn;
    }
  }
}

function range(len: number) {
  return [...Array(len).keys()];
}

function min(turns: number[]): number {
  return turns[0];
}
function max(turns: number[]): number {
  return turns.slice(-1)[0];
}
function mean(turns: number[]): number {
  return turns.reduce((acc, turn) => acc + turn) / turns.length;
}
function median(turns: number[]): number {
  if (turns.length === 2) {
    return mean(turns);
  }
  if (turns.length % 2 !== 0) {
    return turns[Math.floor(turns.length / 2)];
  }
  return (turns[Math.floor(turns.length / 2)] +
    turns[Math.floor(turns.length / 2) + 1]) / 2;
}
