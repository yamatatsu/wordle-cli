import { assertEquals } from "https://deno.land/std@0.120.0/testing/asserts.ts";
import Solver from "../lib/solver.ts";
import Questioner from "../lib/questioner.ts";

Deno.test("Solver filter not-containing", () => {
  const words = ["abcde", "azzzz", "bzzzz", "czzzz", "dzzzz", "ezzzz", "fghij"];
  const answer = last(words);
  const questioner = new Questioner(words, answer);
  const solver = new Solver(words);

  const result = questioner.judge(solver.response());
  if (result.type !== "unsolved") {
    throw new Error();
  }
  solver.addFeed(result.result);

  assertEquals(solver.response(), answer);
});

Deno.test("Solver filter containing", () => {
  const words = ["abcde", "fghij", "bcdea"];
  const answer = last(words);
  const questioner = new Questioner(words, answer);
  const solver = new Solver(words);

  const result = questioner.judge(solver.response());
  if (result.type !== "unsolved") {
    throw new Error();
  }
  solver.addFeed(result.result);

  assertEquals(solver.response(), answer);
});

Deno.test("Solver filter exact", () => {
  const words = ["abcde", "fghia", "ghiaf", "hiafg", "iafgh", "afghi"];
  const answer = last(words);
  const questioner = new Questioner(words, answer);
  const solver = new Solver(words);

  const result = questioner.judge(solver.response());
  if (result.type !== "unsolved") {
    throw new Error();
  }
  solver.addFeed(result.result);

  assertEquals(solver.response(), answer);
});

function last<T>(list: T[]): T {
  return list.slice(-1)[0];
}
