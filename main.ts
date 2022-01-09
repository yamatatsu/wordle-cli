#!/usr/bin/env -S deno run --allow-read=./words.txt
import startGame from "./lib/wordle_game.ts";

const words = await getWords();

const solver = {
  solve: () => prompt("Please enter input")?.toLowerCase(),
};

startGame(words, solver);

async function getWords(): Promise<string[]> {
  const file = await Deno.readTextFile("./words.txt");
  const words = file.toLowerCase().split("\n");
  return words;
}
