import { describe, expect, test } from "vitest";
import {
  AsteriskWithNeighbours,
  NumberMatch,
  findNumbers,
  findSymbols,
  getAsteriskNeighbours,
  getSymbolAdjacentCoords,
  isPartNumber,
  sumGearRatios,
  sumPartNumbers,
} from "./solution";
import { getLines, logSolution, readFile } from "../lib";

describe("Find all numbers in a schematic", () => {
  test("findNumbers finds one number", () => {
    const schematic = ["58"];

    const matches = findNumbers(schematic);

    expect(matches).toStrictEqual<NumberMatch[]>([
      {
        value: 58,
        coordinates: [
          { row: 0, column: 0 },
          { row: 0, column: 1 },
        ],
      },
    ]);
  });

  test("findNumbers finds one number with its location", () => {
    const schematic = ["...58"];

    const matches = findNumbers(schematic);

    expect(matches).toStrictEqual<NumberMatch[]>([
      {
        value: 58,
        coordinates: [
          { row: 0, column: 3 },
          { row: 0, column: 4 },
        ],
      },
    ]);
  });

  test("findNumbers finds two numbers with their locations", () => {
    const schematic = ["...58..306.."];

    const matches = findNumbers(schematic);

    expect(matches).toStrictEqual<NumberMatch[]>([
      {
        value: 58,
        coordinates: [
          { row: 0, column: 3 },
          { row: 0, column: 4 },
        ],
      },
      {
        value: 306,
        coordinates: [
          { row: 0, column: 7 },
          { row: 0, column: 8 },
          { row: 0, column: 9 },
        ],
      },
    ]);
  });

  test("findNumbers finds numbers in different rows", () => {
    const schematic = ["............", ".......306..", "..7........."];

    const matches = findNumbers(schematic);

    expect(matches).toStrictEqual<NumberMatch[]>([
      {
        value: 306,
        coordinates: [
          { row: 1, column: 7 },
          { row: 1, column: 8 },
          { row: 1, column: 9 },
        ],
      },

      {
        value: 7,
        coordinates: [{ row: 2, column: 2 }],
      },
    ]);
  });
});

describe("Find symbols in a schematic", () => {
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

  test("Finds asterisks in multiple rows", () => {
    const schematic = ["*....#..", "..+...**"];

    const symbols = findSymbols(schematic, /\*/g);

    expect(symbols).toStrictEqual([
      { row: 0, column: 0 },
      { row: 1, column: 6 },
      { row: 1, column: 7 },
    ]);
  });
});

describe("Get all adjacent coordinates for a list of symbol coordinates", () => {
  test("Returns the surrounding coordinates for a single input coordinate", () => {
    const symbolCoords = [{ row: 1, column: 1 }];

    const adjacentCoords = getSymbolAdjacentCoords(symbolCoords);

    expect(adjacentCoords).toStrictEqual([
      { row: 0, column: 0 },
      { row: 0, column: 1 },
      { row: 0, column: 2 },
      { row: 1, column: 0 },
      { row: 1, column: 2 },
      { row: 2, column: 0 },
      { row: 2, column: 1 },
      { row: 2, column: 2 },
    ]);
  });

  test("Returns the surrounding coordinates for two input coordinates", () => {
    const symbolCoords = [
      { row: 1, column: 1 },
      { row: 6, column: 6 },
    ];

    const adjacentCoords = getSymbolAdjacentCoords(symbolCoords);

    expect(adjacentCoords).toStrictEqual([
      { row: 0, column: 0 },
      { row: 0, column: 1 },
      { row: 0, column: 2 },
      { row: 1, column: 0 },
      { row: 1, column: 2 },
      { row: 2, column: 0 },
      { row: 2, column: 1 },
      { row: 2, column: 2 },

      { row: 5, column: 5 },
      { row: 5, column: 6 },
      { row: 5, column: 7 },
      { row: 6, column: 5 },
      { row: 6, column: 7 },
      { row: 7, column: 5 },
      { row: 7, column: 6 },
      { row: 7, column: 7 },
    ]);
  });
});

describe("Check if number is a part number", () => {
  test("returns true if the coordinate of the digit is in given list of symbol adjacent coordinates", () => {
    const numberMatch: NumberMatch = {
      value: 1,
      coordinates: [{ row: 1, column: 1 }],
    };

    const symbolAdjacentCoords = [{ row: 1, column: 1 }];

    expect(isPartNumber(numberMatch, symbolAdjacentCoords)).toBe(true);
  });

  test("returns false if the coordinate of the digit is not in given list of symbol adjacent coordinates", () => {
    const numberMatch: NumberMatch = {
      value: 1,
      coordinates: [{ row: 1, column: 1 }],
    };

    const symbolAdjacentCoords = [{ row: 4, column: 2 }];

    expect(isPartNumber(numberMatch, symbolAdjacentCoords)).toBe(false);
  });
});

describe("Get a symbol's neighbouring numbers", () => {
  test("No neighbours", () => {
    const result = getAsteriskNeighbours({ row: 0, column: 0 }, []);

    expect(result).toStrictEqual({
      value: "*",
      coordinate: { row: 0, column: 0 },
      neighbours: [],
    });
  });

  test("One neighbour", () => {
    const result = getAsteriskNeighbours({ row: 0, column: 0 }, [
      { value: 1, coordinates: [{ row: 0, column: 1 }] },
    ]);

    expect(result).toStrictEqual<AsteriskWithNeighbours>({
      value: "*",
      coordinate: { row: 0, column: 0 },
      neighbours: [{ value: 1, coordinates: [{ row: 0, column: 1 }] }],
    });
  });

  test("One number but it's not a neighbour", () => {
    const result = getAsteriskNeighbours({ row: 0, column: 0 }, [
      { value: 1, coordinates: [{ row: 2, column: 2 }] },
    ]);

    expect(result).toStrictEqual<AsteriskWithNeighbours>({
      value: "*",
      coordinate: { row: 0, column: 0 },
      neighbours: [],
    });
  });

  test("Two neighbouring multi-digit numbers in a 2-D grid", () => {
    /*
    ....79
    ...*..
    402...
    */
    const result = getAsteriskNeighbours({ row: 1, column: 3 }, [
      {
        value: 79,
        coordinates: [
          { row: 0, column: 4 },
          { row: 0, column: 5 },
        ],
      },
      {
        value: 402,
        coordinates: [
          { row: 2, column: 0 },
          { row: 2, column: 1 },
          { row: 2, column: 2 },
        ],
      },
    ]);

    expect(result).toStrictEqual<AsteriskWithNeighbours>({
      value: "*",
      coordinate: { row: 1, column: 3 },
      neighbours: [
        {
          value: 79,
          coordinates: [
            { row: 0, column: 4 },
            { row: 0, column: 5 },
          ],
        },
        {
          value: 402,
          coordinates: [
            { row: 2, column: 0 },
            { row: 2, column: 1 },
            { row: 2, column: 2 },
          ],
        },
      ],
    });
  });
});

const exampleSchematic = [
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

test("sumPartNumbers adds all part numbers that are adjacent to a non-period symbol, including diagonally adjacent", () => {
  const sum = sumPartNumbers(exampleSchematic);

  expect(sum).toBe(4361);
});

test("Part 1", () => {
  const file = readFile("./day-03/input.txt");
  const lines = getLines(file);
  const result = sumPartNumbers(lines);
  const expected = 540212;
  expect(result).toBe(expected);
  logSolution("03", "1", expected.toString());
});

test("sumGearRatios finds all gears and sums their ratios", () => {
  const sum = sumGearRatios(exampleSchematic);

  expect(sum).toBe(467835);
});

test("Part 2", () => {
  const file = readFile("./day-03/input.txt");
  const lines = getLines(file);
  const result = sumGearRatios(lines);
  const expected = 87605697;
  expect(result).toBe(expected);
  logSolution("03", "2", expected.toString());
});
