import { expect, test } from "vitest";
import {
  findLowestLocation,
  getMapped,
  parseAlmanac,
  seedToLocationNumber,
} from "./solution";
import { logSolution, readFile } from "../lib";

const sampleAlmanac = `seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4`;

test("Parse almanac", () => {
  const { seeds, almanac } = parseAlmanac(sampleAlmanac);

  expect(seeds).toStrictEqual([79, 14, 55, 13]);
  expect(almanac).toStrictEqual({
    seedToSoil: [
      [50, 98, 2],
      [52, 50, 48],
    ],
    soilToFertilizer: [
      [0, 15, 37],
      [37, 52, 2],
      [39, 0, 15],
    ],
    fertilizerToWater: [
      [49, 53, 8],
      [0, 11, 42],
      [42, 0, 7],
      [57, 7, 4],
    ],
    waterToLight: [
      [88, 18, 7],
      [18, 25, 70],
    ],
    lightToTemperature: [
      [45, 77, 23],
      [81, 45, 19],
      [68, 64, 13],
    ],
    temperatureToHumidity: [
      [0, 69, 1],
      [1, 0, 69],
    ],
    humidityToLocation: [
      [60, 56, 37],
      [56, 93, 4],
    ],
  });
});

test("Get mapped value", () => {
  const mappings = [
    [50, 98, 2],
    [52, 50, 48],
  ] as const;

  expect(getMapped(mappings, 79)).toBe(81);
  expect(getMapped(mappings, 14)).toBe(14);
  expect(getMapped(mappings, 55)).toBe(57);
  expect(getMapped(mappings, 13)).toBe(13);
});

test("Seed to location number", () => {
  const { almanac } = parseAlmanac(sampleAlmanac);
  const locationNumber = seedToLocationNumber(almanac, 79);

  expect(locationNumber).toBe(82);
});

test("Find lowest location number", () => {
  const lowest = findLowestLocation(sampleAlmanac);

  expect(lowest).toBe(35);
});

test("Part 1", () => {
  const file = readFile("./day-05/input.txt");
  const result = findLowestLocation(file);
  const expected = 389056265;
  expect(result).toBe(expected);
  logSolution("05", "1", expected);
});

test.skip("Part 2", () => {
  // TODO: template for day-xx
  // const file = readFile("./day-xx/input.txt");
  // const result = ;
  // const expected = ;
  // expect(result).toBe(expected);
  // TODO: template for day-xx
  // logSolution("xx", "2", expected);
});
