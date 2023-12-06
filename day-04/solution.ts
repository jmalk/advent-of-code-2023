import { add } from "../lib";

export type Scratchcard = {
  winningNumbers: number[];
  playersNumbers: number[];
};

const stringToNumbers = (str: string): number[] =>
  str
    .trim()
    .split(/\s+/)
    .map((s) => parseInt(s));

export const parseScratchard = (cardString: string): Scratchcard => {
  const numbers = cardString.split(":")[1];

  const [winningNumbers, playersNumbers] = numbers
    .split("|")
    .map(stringToNumbers);

  return {
    winningNumbers,
    playersNumbers,
  };
};

export const getIntersection = (a: number[], b: number[]): number[] =>
  a.filter((n) => b.includes(n));

export const calculatePoints = (matches: number) =>
  matches > 0 ? Math.pow(2, matches - 1) : 0;

export const sumPoints = (scratchcardStrings: string[]): number => {
  return scratchcardStrings
    .map(parseScratchard)
    .map(({ winningNumbers, playersNumbers }) =>
      getIntersection(winningNumbers, playersNumbers),
    )
    .map((matches) => matches.length)
    .map((numberOfMatches) => calculatePoints(numberOfMatches))
    .reduce(add, 0);
};
