import { expect, test } from "vitest";
import { getNumberOfStepsToZZZ, parseInput } from "./solution";
import { getLines, logSolution, readFile } from "../lib";

const exampleInput = `LLR

AAA = (BBB, BBB)
BBB = (AAA, ZZZ)
ZZZ = (ZZZ, ZZZ)
`;

test("Parse input", () => {
  const result = parseInput(exampleInput);

  expect(result).toEqual({
    route: ["L", "L", "R"],
    nodes: {
      AAA: { L: "BBB", R: "BBB" },
      BBB: { L: "AAA", R: "ZZZ" },
      ZZZ: { L: "ZZZ", R: "ZZZ" },
    },
  });
});

test("Get steps needed to reach node ZZZ", () => {
  const result = getNumberOfStepsToZZZ(exampleInput);

  expect(result).toBe(6);
});

test("Part 1", () => {
  const file = readFile("./day-08/input.txt");
  const result = getNumberOfStepsToZZZ(file);
  const expected = 16579;
  expect(result).toBe(expected);
  logSolution("08", "1", expected);
});

test("Part 2", () => {
  // TODO: template for day-xx
  // const file = readFile("./day-xx/input.txt");
  // const lines = getLines(file);
  // const result = ;
  // const expected = ;
  // expect(result).toBe(expected);
  // TODO: template for day-xx
  // logSolution("xx", "2", expected);
  // expect(true).toBe(false);
});
