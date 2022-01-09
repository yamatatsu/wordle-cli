import * as Color from "./color.ts";
import { EstimatedResult } from "./questioner.ts";

const alphabets = "qwertyuiopasdfghjklzxcvbnm".split("");
type AlphabetsStatus = Record<
  string,
  { type: "not_yet" | "not_containing" | "containing" | "exactly" }
>;

export default class Assistant {
  private alphabetsStatus: AlphabetsStatus;
  constructor() {
    this.alphabetsStatus = alphabets.reduce((acc, alphabet) => {
      return { ...acc, [alphabet]: { type: "not_yet" } };
    }, {});
  }
  getEstimatedResults(estimatedResults: EstimatedResult[]) {
    estimatedResults.forEach((res) => {
      const status = this.alphabetsStatus[res.char];
      if (status.type === "exactly") {
        return;
      }
      if (res.same) {
        status.type = "exactly";
        return;
      }
      if (status.type === "containing") {
        return;
      }
      if (res.containing) {
        status.type = "containing";
        return;
      }
      status.type = "not_containing";
    });
  }
  sayHint() {
    return Object.entries(this.alphabetsStatus).map(([alphabet, { type }]) => {
      switch (type) {
        case "exactly":
          return Color.exactly(alphabet);
        case "containing":
          return Color.containing(alphabet);
        case "not_containing":
          return Color.notContaining(alphabet);
        case "not_yet":
          return alphabet;
        default:
          throw new Error();
      }
    }).join("");
  }
}
