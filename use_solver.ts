#!/usr/bin/env -S deno run --allow-read=./words.txt
import getWords from "./lib/get_words.ts";
import startGame from "./lib/wordle_game.ts";
import Solver from "./lib/solver.ts";

const words = await getWords();

const turns = range(10).map(() => {
  const solver = new Solver(words);
  return startGame(words, solver);
}).sort();

console.info("min:", min(turns));
console.info("max:", max(turns));
console.info("mean:", mean(turns));
console.info("median:", median(turns));

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
