#!/usr/bin/env -S deno run --allow-read=./words.txt
import getWords from "./lib/get_words.ts";
import startGame from "./lib/wordle_game.ts";

const words = await getWords();

const solver = {
  response: () => prompt("Please enter input")?.toLowerCase(),
};

startGame(words, solver);
