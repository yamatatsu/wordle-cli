export default class Solver {
  constructor(private words: readonly string[]) {}
  public response() {
    const [head, ...tail] = this.words;
    this.words = tail;
    return head;
  }
}
