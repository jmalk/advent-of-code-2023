import { add } from "../lib";

export type Bag = {
  red: number;
  green: number;
  blue: number;
};

export type Round = Bag;

export type Game = {
  id: number;
  rounds: Round[];
};

type GameReport = string;
type GameReports = GameReport[];

export const parseRound = (round: string): Bag => {
  const colors = round.split(", ");

  let red = 0;
  let green = 0;
  let blue = 0;

  colors.forEach((color) => {
    const [number, colorName] = color.split(" ");

    if (colorName === "red") {
      red = parseInt(number);
    }
    if (colorName === "green") {
      green = parseInt(number);
    }
    if (colorName === "blue") {
      blue = parseInt(number);
    }
  });

  return {
    red,
    green,
    blue,
  };
};

export const parseGameReport = (report: GameReport): Game => {
  // gameString like "Game 1"
  const [gameString, untrimmedRoundsString] = report.split(":");
  // idString like "1"
  const [, idString] = gameString.split(" ");
  const id = parseInt(idString);

  const roundsString = untrimmedRoundsString.trim();

  const unparsedRounds = roundsString.split(";").map((s) => s.trim());

  const rounds = unparsedRounds.map((unparsed) => parseRound(unparsed));

  return {
    id,
    rounds,
  };
};

export const isPossible = (round: Round, bag: Bag): boolean => {
  return (
    round.red <= bag.red && round.green <= bag.green && round.blue <= bag.blue
  );
};

export const sumIDsOfPossibleGames = (gameReports: GameReports, bag: Bag) => {
  // Convert GameReports to Games
  const games = gameReports.map(parseGameReport);

  // Filter out GameReports where *any* round in the game had more red, green or
  // blue cubes than there are in the bag.
  const possibleGames = games.filter(({ rounds }) =>
    rounds.every((round) => isPossible(round, bag)),
  );

  // Sum the IDs of the remaining games.
  const sumIDs = possibleGames.map((game) => game.id).reduce(add, 0);

  return sumIDs;
};

export const minimumViableCubes = (rounds: Round[]): Bag => {
  return rounds.reduce(
    (previous, current) => {
      return {
        red: Math.max(previous.red, current.red),
        green: Math.max(previous.green, current.green),
        blue: Math.max(previous.blue, current.blue),
      };
    },
    {
      red: 0,
      green: 0,
      blue: 0,
    },
  );
};

export const powerOfBag = ({ red, green, blue }: Bag): number =>
  red * green * blue;

export const sumPowersMinimumViableCubes = (
  gameReports: GameReports,
): number => {
  // Parse all the game reports
  const games = gameReports.map(parseGameReport);

  // Reduce each game report to the minimum viable set of cubes to make the game possible
  const minimumViableBags = games.map((game) =>
    minimumViableCubes(game.rounds),
  );

  // Get the power of each set of cubes (nRed * nGreen * nBlue)
  const powers = minimumViableBags.map((bag) => powerOfBag(bag));

  // Sum all the powers
  const sum = powers.reduce(add, 0);

  // Return the sum
  return sum;
};
