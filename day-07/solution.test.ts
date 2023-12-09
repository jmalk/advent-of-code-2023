import { describe, expect, test } from "vitest";
import {
  compareHands,
  compareHandsJokerRules,
  getHandType,
  getHandTypeJokerRules,
  getTotalWinnings,
  getTotalWinningsWithJokerRules,
} from "./solution";
import { getLines, logSolution, readFile } from "../lib";

const exampleInput = [
  "32T3K 765",
  "T55J5 684",
  "KK677 28",
  "KTJJT 220",
  "QQQJA 483",
];

describe("getHandType", () => {
  test("returns HIGH CARD for all counts of 1", () => {
    const counts = {
      T: 1,
      J: 1,
      Q: 1,
      K: 1,
      A: 1,
    };

    expect(getHandType(counts)).toBe("HIGH CARD");
  });

  test("returns PAIR for one count of 2", () => {
    const counts = {
      T: 2,
      Q: 1,
      K: 1,
      A: 1,
    };

    expect(getHandType(counts)).toBe("PAIR");
  });

  test("returns TWO PAIR for two counts of 2", () => {
    const counts = {
      T: 2,
      K: 2,
      A: 1,
    };

    expect(getHandType(counts)).toBe("TWO PAIR");
  });

  test("returns THREE for one count of 3", () => {
    const counts = {
      T: 1,
      K: 3,
      A: 1,
    };

    expect(getHandType(counts)).toBe("THREE");
  });

  test("returns FULL HOUSE for a 3 and a 2", () => {
    const counts = {
      T: 2,
      K: 3,
    };

    expect(getHandType(counts)).toBe("FULL HOUSE");
  });

  test("returns FOUR for one count of 4", () => {
    const counts = {
      K: 4,
      A: 1,
    };

    expect(getHandType(counts)).toBe("FOUR");
  });

  test("returns FIVE for one count of 5", () => {
    const counts = {
      K: 5,
    };

    expect(getHandType(counts)).toBe("FIVE");
  });
});

describe("Compare hands", () => {
  // Want ordering weakest first, strongest second

  test("A pair beats no matching cards", () => {
    const a = { bid: 1, cards: "A23A4".split("") };
    const b = { bid: 1, cards: "23456".split("") };

    expect(compareHands(a, b)).toBe(1);
    expect(compareHands(b, a)).toBe(-1);
  });

  test("Two equal pairs draw", () => {
    const a = { bid: 1, cards: "A23A4".split("") };

    expect(compareHands(a, a)).toBe(0);
  });

  test("Two pair beats one pair", () => {
    const a = { bid: 1, cards: "AA223".split("") };
    const b = { bid: 1, cards: "AA234".split("") };

    expect(compareHands(a, b)).toBe(1);
    expect(compareHands(b, a)).toBe(-1);
  });

  test("In a draw, check first card; highest wins", () => {
    const a = { bid: 1, cards: "AA334".split("") };
    const b = { bid: 1, cards: "KK334".split("") };

    expect(compareHands(a, b)).toBe(1);
    expect(compareHands(b, a)).toBe(-1);
  });

  test("In a draw, if first card equal, check second card; highest wins", () => {
    const a = { bid: 1, cards: "AKQJT".split("") };
    const b = { bid: 1, cards: "AQ765".split("") };

    expect(compareHands(a, b)).toBe(1);
    expect(compareHands(b, a)).toBe(-1);
  });

  test("In a draw, if first two cards equal, check third card; highest wins", () => {
    const a = { bid: 1, cards: "AKQJT".split("") };
    const b = { bid: 1, cards: "AK765".split("") };

    expect(compareHands(a, b)).toBe(1);
    expect(compareHands(b, a)).toBe(-1);
  });

  test("In a draw, if first three cards equal, check fourth card; highest wins", () => {
    const a = { bid: 1, cards: "AKQJT".split("") };
    const b = { bid: 1, cards: "AKQ65".split("") };

    expect(compareHands(a, b)).toBe(1);
    expect(compareHands(b, a)).toBe(-1);
  });

  test("In a draw, if first four cards equal, check fifth card; highest wins", () => {
    const a = { bid: 1, cards: "AKQJT".split("") };
    const b = { bid: 1, cards: "AKQJ5".split("") };

    expect(compareHands(a, b)).toBe(1);
    expect(compareHands(b, a)).toBe(-1);
  });
});

test("Total winnings", () => {
  const totalWinnings = getTotalWinnings(exampleInput);

  expect(totalWinnings).toBe(6440);
});

test("Part 1", () => {
  const file = readFile("./day-07/input.txt");
  const lines = getLines(file);
  const result = getTotalWinnings(lines);
  const expected = 250370104;
  expect(result).toBe(expected);
  logSolution("07", "1", expected);
});

test("Total winnings with Joker rule", () => {
  const totalWinnings = getTotalWinningsWithJokerRules(exampleInput);

  expect(totalWinnings).toBe(5905);
});

test("Compare hands with Joker Rules", () => {
  const a = { bid: 1, cards: "KTJJT".split("") };
  const b = { bid: 1, cards: "KK677".split("") };

  expect(compareHandsJokerRules(a, b)).toBe(1);
  expect(compareHandsJokerRules(b, a)).toBe(-1);
});

describe("Get hand type with Joker rules", () => {
  test("Four of a kind with two jokers", () => {
    const cardCounts = {
      Q: 2,
      J: 2,
      2: 1,
    };

    const handType = getHandTypeJokerRules(cardCounts);

    expect(handType).toBe("FOUR");
  });

  test("Full house with one joker", () => {
    const cardCounts = {
      Q: 2,
      J: 1,
      2: 2,
    };

    const handType = getHandTypeJokerRules(cardCounts);

    expect(handType).toBe("FULL HOUSE");
  });

  test("Two pairs with no joker", () => {
    const cardCounts = {
      Q: 2,
      2: 2,
      3: 1,
    };

    const handType = getHandTypeJokerRules(cardCounts);

    expect(handType).toBe("TWO PAIR");
  });

  test("Five of a kind with five jokers", () => {
    const cardCounts = {
      J: 5,
    };

    const handType = getHandTypeJokerRules(cardCounts);

    expect(handType).toBe("FIVE");
  });
});

test("Part 2", () => {
  const file = readFile("./day-07/input.txt");
  const lines = getLines(file);
  const result = getTotalWinningsWithJokerRules(lines);
  const expected = 251735672;
  expect(result).toBe(expected);
  logSolution("07", "2", expected);
});
