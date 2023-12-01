import { getLines, logSolution, readFile } from "../lib";
import { expect, test } from "vitest";
import { sumCalibrationValues } from "./solution";

test("Sum calibration values including numbers as words", () => {
  const sampleInput = [
    "two1nine",
    "eightwothree",
    "abcone2threexyz",
    "xtwone3four",
    "4nineeightseven2",
    "zoneight234",
    "7pqrstsixteen",
  ];

  const result = sumCalibrationValues(sampleInput);

  expect(result).toBe(281);
});

test("Part 2", () => {
  const file = readFile("./day-01/input.txt");
  const lines = getLines(file);

  const result = sumCalibrationValues(lines);

  const expected = 52834;
  expect(result).toBe(expected);
  logSolution("1", "2", expected.toString());
});
