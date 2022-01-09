export default class Solver {
  constructor(private words: string[]) {}
  public solve() {
    const [head, ...tail] = this.words;
    this.words = tail;
    return head;
  }
}
