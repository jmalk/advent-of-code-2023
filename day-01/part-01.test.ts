import { expect, test } from "vitest";
import { sumCalibrationValues } from "./part-01";
import { getLines, readFile } from "../lib";

test("Sum calibration values", () => {
  const sampleInput = ["1abc2", "pqr3stu8vwx", "a1b2c3d4e5f", "treb7uchet"];

  const result = sumCalibrationValues(sampleInput);

  expect(result).toBe(142);
});

test("Part 1", () => {
  const file = readFile("./day-01/input.txt");
  const lines = getLines(file);

  const result = sumCalibrationValues(lines);

  expect(result).toBe(53334);
});
