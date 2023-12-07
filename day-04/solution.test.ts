import { expect, test } from "vitest";
import {
  calculatePoints,
  getIntersection,
  parseScratchard,
  sumNumberScratchcards,
  sumPoints,
} from "./solution";
import { getLines, logSolution, readFile } from "../lib";

const sampleScratchcards = [
  "Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53",
  "Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19",
  "Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1",
  "Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83",
  "Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36",
  "Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11",
];

test("parseScratchard takes a string representation and returns a Scratchcard", () => {
  const cardString = "Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53";
  const scratchcard = parseScratchard(cardString);

  expect(scratchcard).toStrictEqual({
    winningNumbers: [41, 48, 83, 86, 17],
    playersNumbers: [83, 86, 6, 31, 17, 9, 48, 53],
  });
});

test("Intersection returns the shared elements of two arrays", () => {
  const intersection = getIntersection(
    [41, 48, 83, 86, 17],
    [83, 86, 6, 31, 17, 9, 48, 53],
  );

  expect(intersection).toStrictEqual([48, 83, 86, 17]);
});

test("calculatePoints returns 2 ^ n-1", () => {
  expect(calculatePoints(0)).toBe(0);
  expect(calculatePoints(1)).toBe(1);
  expect(calculatePoints(2)).toBe(2);
  expect(calculatePoints(3)).toBe(4);
  expect(calculatePoints(4)).toBe(8);
});

test("sumPoints in scratchcards", () => {
  const points = sumPoints(sampleScratchcards);

  expect(points).toBe(13);
});

test("Part 1", () => {
  const file = readFile("./day-04/input.txt");
  const lines = getLines(file);
  const result = sumPoints(lines);
  const expected = 20407;
  expect(result).toBe(expected);
  logSolution("04", "1", expected);
});

test("sum total number of scratchcards", () => {
  const total = sumNumberScratchcards(sampleScratchcards);

  expect(total).toBe(30);
});

test("Part 2", () => {
  const file = readFile("./day-04/input.txt");
  const lines = getLines(file);
  const result = sumNumberScratchcards(lines);
  const expected = 23806951;
  expect(result).toBe(expected);
  logSolution("04", "2", expected);
});
