import {
  bgGreen,
  bgYellow,
  black,
  gray,
} from "https://deno.land/std/fmt/colors.ts";

export const exact = bgGreen;
export const containing = (w: string) => black(bgYellow(w));
export const notContaining = gray;
