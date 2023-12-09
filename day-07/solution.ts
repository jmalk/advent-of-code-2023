export type HandType =
  | "HIGH CARD"
  | "PAIR"
  | "TWO PAIR"
  | "THREE"
  | "FULL HOUSE"
  | "FOUR"
  | "FIVE";

// TODO: Would be nice to make this more specific
export type Cards = string[];

export type Hand = {
  bid: number;
  cards: Cards;
};

export const getHandType = (cardCounts: CardCounts): HandType => {
  const counts = Object.values(cardCounts);
  const maxCount = Math.max(...counts);
  const differentCards = counts.length;

  if (maxCount === 5) {
    return "FIVE";
  }

  if (maxCount === 4) {
    return "FOUR";
  }

  if (maxCount === 3) {
    if (differentCards === 2) {
      return "FULL HOUSE";
    }
    return "THREE";
  }

  if (maxCount === 2) {
    if (differentCards === 3) {
      return "TWO PAIR";
    }
    return "PAIR";
  }

  return "HIGH CARD";
};

export const getHandTypeJokerRules = (cardCounts: CardCounts): HandType => {
  // Rest of function assumes that at least one card is NOT a joker, so return
  // early in case where all are jokers.
  if (cardCounts.J === 5) {
    return "FIVE";
  }

  // Find most copies non-jokers card
  let maxNonJokerCard = "";
  let maxNumberNonJokerCard = 0;

  for (const card in cardCounts) {
    if (card !== "J" && cardCounts[card] > maxNumberNonJokerCard) {
      maxNonJokerCard = card;
      maxNumberNonJokerCard = cardCounts[card];
    }
  }

  const effectiveCardCounts = {};
  for (const [key, value] of Object.entries(cardCounts)) {
    if (key === "J") {
      continue;
    } else if (key === maxNonJokerCard) {
      effectiveCardCounts[key] = value + (cardCounts.J || 0);
    } else {
      effectiveCardCounts[key] = value;
    }
  }

  return getHandType(effectiveCardCounts);
};

type CardCounts = Record<string, number>;

const countCards = (hand: Hand): CardCounts => {
  return hand.cards.reduce((counts, card) => {
    if (Object.keys(counts).includes(card)) {
      counts[card] += 1;
    } else {
      counts[card] = 1;
    }
    return counts;
  }, {});
};

const handRanking: HandType[] = [
  "HIGH CARD",
  "PAIR",
  "TWO PAIR",
  "THREE",
  "FULL HOUSE",
  "FOUR",
  "FIVE",
];

const cardRanking: string[] = [
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "T",
  "J",
  "Q",
  "K",
  "A",
];

const cardRankingJokerRules: string[] = [
  "J",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "T",
  "Q",
  "K",
  "A",
];

type CompareReturn = -1 | 0 | 1;

export const compareHands = (a: Hand, b: Hand): CompareReturn => {
  const aType = getHandType(countCards(a));
  const bType = getHandType(countCards(b));

  const aRank = handRanking.indexOf(aType);
  const bRank = handRanking.indexOf(bType);

  if (aRank > bRank) {
    return 1;
  }

  if (aRank < bRank) {
    return -1;
  }

  // In a draw, check the cards in order, for a higher card to break the tie.
  for (let i = 0; i < 5; i++) {
    // Using indexOf might be fragile here as it can be -1.
    // So this function assumes no strings will every contain a non-card character.
    if (cardRanking.indexOf(a.cards[i]) > cardRanking.indexOf(b.cards[i])) {
      return 1;
    }

    if (cardRanking.indexOf(a.cards[i]) < cardRanking.indexOf(b.cards[i])) {
      return -1;
    }
  }

  // Two completely equal hands are of the same rank and don't need swapping in a sort.
  return 0;
};

export const compareHandsJokerRules = (a: Hand, b: Hand): CompareReturn => {
  const aType = getHandTypeJokerRules(countCards(a));
  const bType = getHandTypeJokerRules(countCards(b));

  const aRank = handRanking.indexOf(aType);
  const bRank = handRanking.indexOf(bType);

  if (aRank > bRank) {
    return 1;
  }

  if (aRank < bRank) {
    return -1;
  }

  // In a draw, check the cards in order, for a higher card to break the tie.
  for (let i = 0; i < 5; i++) {
    // Using indexOf might be fragile here as it can be -1.
    // So this function assumes no strings will every contain a non-card character.
    if (
      cardRankingJokerRules.indexOf(a.cards[i]) >
      cardRankingJokerRules.indexOf(b.cards[i])
    ) {
      return 1;
    }

    if (
      cardRankingJokerRules.indexOf(a.cards[i]) <
      cardRankingJokerRules.indexOf(b.cards[i])
    ) {
      return -1;
    }
  }

  // Two completely equal hands are of the same rank and don't need swapping in a sort.
  return 0;
};

export const getTotalWinnings = (input: string[]): number => {
  return input
    .map((str) => str.split(" "))
    .map((h) => ({
      bid: parseInt(h[1]),
      cards: h[0].split(""),
    }))
    .sort(compareHands)
    .reduce((runningTotal, hand, index) => {
      const rank = index + 1;
      const { bid } = hand;
      return runningTotal + rank * bid;
    }, 0);
};

export const getTotalWinningsWithJokerRules = (input: string[]): number => {
  return input
    .map((str) => str.split(" "))
    .map((h) => ({
      bid: parseInt(h[1]),
      cards: h[0].split(""),
    }))
    .sort(compareHandsJokerRules)
    .reduce((runningTotal, hand, index) => {
      const rank = index + 1;
      const { bid } = hand;
      return runningTotal + rank * bid;
    }, 0);
};
