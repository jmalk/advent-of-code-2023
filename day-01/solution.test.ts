import { expect, test } from "vitest";
import { sumCalibrationValues } from "./solution";
import { getLines, logSolution, readFile } from "../lib";

test("Sum calibration values", () => {
  const sampleInput = ["1abc2", "pqr3stu8vwx", "a1b2c3d4e5f", "treb7uchet"];

  const result = sumCalibrationValues(sampleInput, false);

  expect(result).toBe(142);
});

test("Part 1", () => {
  const file = readFile("./day-01/input.txt");
  const lines = getLines(file);

  const result = sumCalibrationValues(lines, false);

  const expected = 53334;
  expect(result).toBe(expected);
  logSolution("1", "1", expected);
});

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
  logSolution("1", "2", expected);
});
