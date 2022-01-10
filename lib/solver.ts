export default class Solver {
  constructor(private words: string[]) {}
  public response() {
    const [head, ...tail] = this.words;
    this.words = tail;
    return head;
  }
}
