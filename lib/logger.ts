import { parse } from "https://deno.land/std@0.120.0/flags/mod.ts";
import * as log from "https://deno.land/std@0.120.0/log/mod.ts";

const args = parse(Deno.args);
const logLevel = args.v ? "DEBUG" : "INFO";

await log.setup({
  handlers: {
    console: new log.handlers.ConsoleHandler(logLevel, {
      formatter: (logRecord) => {
        const level = log.LogLevels[logRecord.level];
        return `[${level}] ${logRecord.msg} ${logRecord.args.join(" ")}`;
      },
    }),
  },

  loggers: {
    default: {
      level: logLevel,
      handlers: ["console"],
    },
  },
});

const Logger = log.getLogger();

export default Logger;
