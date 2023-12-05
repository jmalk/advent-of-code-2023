import { describe, expect, test } from "vitest";
import {
  NumberMatch,
  findNumbers,
  findSymbols,
  sumPartNumbers,
} from "./solution";
// import { getLines, logSolution, readFile } from "../lib";

describe("Find all numbers in a schematic", () => {
  test("findNumbers finds one number", () => {
    const schematic = ["58"];

    const matches = findNumbers(schematic);

    expect(matches).toStrictEqual<NumberMatch[]>([
      {
        value: 58,
        row: 0,
        start: 0,
        end: 1,
      },
    ]);
  });

  test("findNumbers finds one number with its location", () => {
    const schematic = ["...58"];

    const matches = findNumbers(schematic);

    expect(matches).toStrictEqual<NumberMatch[]>([
      {
        value: 58,
        row: 0,
        start: 3,
        end: 4,
      },
    ]);
  });

  test("findNumbers finds two numbers with their locations", () => {
    const schematic = ["...58..306.."];

    const matches = findNumbers(schematic);

    expect(matches).toStrictEqual<NumberMatch[]>([
      {
        value: 58,
        row: 0,
        start: 3,
        end: 4,
      },
      {
        value: 306,
        row: 0,
        start: 7,
        end: 9,
      },
    ]);
  });

  test("findNumbers finds numbers in different rows", () => {
    const schematic = ["............", ".......306..", "..7........."];

    const matches = findNumbers(schematic);

    expect(matches).toStrictEqual<NumberMatch[]>([
      {
        value: 306,
        row: 1,
        start: 7,
        end: 9,
      },

      {
        value: 7,
        row: 2,
        start: 2,
        end: 2,
      },
    ]);
  });
});

describe("Find all symbols in a schematic", () => {
  test("Finds one symbol", () => {
    const schematic = ["*"];

    const symbols = findSymbols(schematic);

    expect(symbols).toStrictEqual([{ row: 0, column: 0 }]);
  });

  test("Finds two symbols", () => {
    const schematic = ["*....#.."];

    const symbols = findSymbols(schematic);

    expect(symbols).toStrictEqual([
      { row: 0, column: 0 },
      { row: 0, column: 5 },
    ]);
  });

  test("Finds symbols in multiple rows", () => {
    const schematic = ["*....#..", "..+....&"];

    const symbols = findSymbols(schematic);

    expect(symbols).toStrictEqual([
      { row: 0, column: 0 },
      { row: 0, column: 5 },
      { row: 1, column: 2 },
      { row: 1, column: 7 },
    ]);
  });
});

test.skip("sumPartNumbers adds all part numbers that are adjacent to a non-period symbol, including diagonally adjacent", () => {
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

test.skip("Part 2", () => {
  // TODO: template for day-xx
  // const file = readFile("./day-xx/input.txt");
  // const lines = getLines(file);
  // const result = ;
  // const expected = ;
  // expect(result).toBe(expected);
  // TODO: template for day-xx
  // logSolution("xx", "2", expected);
});
