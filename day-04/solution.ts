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

export const sumNumberScratchcards = (scratchcardStrings: string[]): number => {
  const pileOfCards = scratchcardStrings
    .map(parseScratchard)
    .map(({ winningNumbers, playersNumbers }) =>
      getIntersection(winningNumbers, playersNumbers),
    )
    .map((matches, i) => ({ card: i, matches: matches.length, copies: 1 }));

  for (let i = 0; i < pileOfCards.length; i++) {
    const currentCard = pileOfCards[i];

    for (let j = i + 1; j <= i + currentCard.matches; j++) {
      const cardToCopy = pileOfCards[j];
      cardToCopy.copies += currentCard.copies;
    }
  }

  return pileOfCards.map((card) => card.copies).reduce(add, 0);
};
