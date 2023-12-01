import { readFileSync } from "node:fs";
import { expect, test } from "vitest";
import { sumCalibrationValues } from "./part-01";

test("Sum calibration values", () => {
  const sampleInput = ["1abc2", "pqr3stu8vwx", "a1b2c3d4e5f", "treb7uchet"];

  const result = sumCalibrationValues(sampleInput);

  expect(result).toBe(142);
});

const file = readFileSync("./day-01/input.txt", { encoding: "utf-8" });
const lines = file.split("\n");
console.log(lines);
const result = sumCalibrationValues(lines);
console.log(result);
