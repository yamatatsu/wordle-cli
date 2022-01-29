import words from "../words.json" assert { type: "json" };

export default function getWords(): readonly string[] {
  return Object.freeze(words.map((w) => w.toLowerCase()));
}
