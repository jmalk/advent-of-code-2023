import { readFileSync } from "node:fs";

export const readFile = (name: string): string =>
  readFileSync(name, { encoding: "utf-8" });
