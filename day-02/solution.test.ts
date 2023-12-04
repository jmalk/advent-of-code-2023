import { describe, expect, test } from "vitest";
import {
  Bag,
  Game,
  Round,
  isPossible,
  minimumViableCubes,
  parseGameReport,
  parseRound,
  powerOfBag,
  sumIDsOfPossibleGames,
  sumPowersMinimumViableCubes,
} from "./solution";
import { getLines, logSolution, readFile } from "../lib";

const sampleInput = [
  "Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green",
  "Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue",
  "Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red",
  "Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red",
  "Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green",
];

describe("parseRound", () => {
  test("2 green", () => {
    const round = "2 green";

    expect(parseRound(round)).toStrictEqual({
      red: 0,
      green: 2,
      blue: 0,
    });
  });

  test("3 blue, 4 red", () => {
    const round = "3 blue, 4 red";

    expect(parseRound(round)).toStrictEqual({
      red: 4,
      green: 0,
      blue: 3,
    });
  });

  test("1 red, 2 green, 6 blue", () => {
    const round = "1 red, 2 green, 6 blue";

    expect(parseRound(round)).toStrictEqual({
      red: 1,
      green: 2,
      blue: 6,
    });
  });
});

test("parseGameReport", () => {
  const report = "Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green";

  const expectedGame: Game = {
    id: 1,
    rounds: [
      {
        red: 4,
        green: 0,
        blue: 3,
      },
      {
        red: 1,
        green: 2,
        blue: 6,
      },
      {
        red: 0,
        green: 2,
        blue: 0,
      },
    ],
  };

  expect(parseGameReport(report)).toStrictEqual(expectedGame);
});

describe("isPossible", () => {
  test(`A round is possible if you don't see more cubes of a color than the bag contains`, () => {
    const round: Round = {
      red: 1,
      green: 2,
      blue: 3,
    };
    const bag: Bag = {
      red: 4,
      green: 4,
      blue: 4,
    };

    expect(isPossible(round, bag)).toBe(true);
  });

  test(`A round is not possible if you see more cubes of a color than the bag contains`, () => {
    const round: Round = {
      red: 12,
      green: 2,
      blue: 3,
    };
    const bag: Bag = {
      red: 4,
      green: 4,
      blue: 4,
    };

    expect(isPossible(round, bag)).toBe(false);
  });
});

test("Sum IDs of possible games", () => {
  const bag: Bag = {
    red: 12,
    green: 13,
    blue: 14,
  };

  const result = sumIDsOfPossibleGames(sampleInput, bag);

  expect(result).toBe(8);
});

test("Part 1", () => {
  const file = readFile("./day-02/input.txt");
  const lines = getLines(file);

  const bag: Bag = {
    red: 12,
    green: 13,
    blue: 14,
  };

  const result = sumIDsOfPossibleGames(lines, bag);
  const expected = 2776;
  expect(result).toBe(expected);
  logSolution("02", "1", expected.toString());
});

describe("Work out minimum viable set of cubes for a list of rounds", () => {
  test("1 red, 1 green, 1 blue", () => {
    const result = minimumViableCubes([{ red: 1, green: 1, blue: 1 }]);

    expect(result).toStrictEqual({ red: 1, green: 1, blue: 1 });
  });

  test("1 red, 1 green, 2 blue; 3 red, 1 green, 1 blue ", () => {
    const result = minimumViableCubes([
      { red: 1, green: 1, blue: 2 },
      { red: 3, green: 1, blue: 1 },
    ]);

    expect(result).toStrictEqual({ red: 3, green: 1, blue: 2 });
  });
});

test("Power of a set is multiple of numbers of cubes", () => {
  const bag: Bag = { red: 2, green: 3, blue: 5 };
  const result = powerOfBag(bag);

  expect(result).toBe(30);
});

test("Sum powers of minimum viable sets of cubes", () => {
  const result = sumPowersMinimumViableCubes(sampleInput);

  expect(result).toBe(2286);
});

test("Part 2", () => {
  const file = readFile("./day-02/input.txt");
  const lines = getLines(file);
  const result = sumPowersMinimumViableCubes(lines);
  const expected = 68638;
  expect(result).toBe(expected);
  logSolution("02", "2", expected.toString());
});
