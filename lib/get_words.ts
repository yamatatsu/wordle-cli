export default async function getWords(): Promise<readonly string[]> {
  const file = await Deno.readTextFile("./words.txt");
  const words = file.toLowerCase().split("\n");
  return Object.freeze(words);
}
