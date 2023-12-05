import { expect, test } from "vitest";
import { sumPartNumbers } from "./solution";
// import { getLines, logSolution, readFile } from "../lib";

test("sumPartNumbers adds all part numbers that are adjacent to a non-period symbol, including diagonally adjacent", () => {
  const schematic = [
    "467..114..",
    "...*......",
    "..35..633.",
    "......#...",
    "617*......",
    ".....+.58.",
    "..592.....",
    "......755.",
    "...$.*....",
    ".664.598..",
  ];

  const sum = sumPartNumbers(schematic);

  expect(sum).toBe(4361);
});

test.skip("Part 1", () => {
  // TODO: template for day-xx
  // const file = readFile("./day-xx/input.txt");
  // const lines = getLines(file);
  // const result = ;
  // const expected = ;
  // expect(result).toBe(expected);
  // TODO: template for day-xx
  // logSolution("xx", "1", expected);
  expect(true).toBe(false);
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
});
