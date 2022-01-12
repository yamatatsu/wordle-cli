export default function selectRandomly<T>(list: readonly T[]): T {
  return list[Math.floor(list.length * Math.random())];
}
