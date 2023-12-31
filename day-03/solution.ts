import { add } from "../lib";

export class Coordinate {
  column: number;
  row: number;

  constructor(column, row) {
    this.column = column;
    this.row = row;
  }
}

export type NumberMatch = {
  value: number;
  coordinates: Coordinate[];
};

export type AsteriskWithNeighbours = {
  value: "*";
  coordinate: Coordinate;
  neighbours: NumberMatch[];
};

export const findNumbers = (schematic: string[]): NumberMatch[] => {
  const numberMatches: NumberMatch[] = [];
  const digits = /\d+/g;

  schematic.forEach((row, index) => {
    const matchesInRow = [...row.matchAll(digits)];

    matchesInRow.forEach((match) => {
      const numberString = match[0];

      const coordinates: Coordinate[] = [];

      for (let i = match.index; i < match.index + numberString.length; i++) {
        coordinates.push(new Coordinate(i, index));
      }

      numberMatches.push({
        value: parseInt(numberString),
        coordinates,
      });
    });
  });

  return numberMatches;
};

// Caret in character set in default RegExp means NOT one of these characters
export const findSymbols = (
  schematic: string[],
  target: RegExp = /[^0-9.]/g,
): Coordinate[] => {
  const locations: Coordinate[] = [];

  schematic.forEach((row, index) => {
    const matchesInRow = [...row.matchAll(target)];

    matchesInRow.forEach((match) => {
      locations.push(new Coordinate(match.index, index));
    });
  });

  return locations;
};

// Doesn't care about boundaries.
// Might return duplicate coordinates.
export const getSymbolAdjacentCoords = (
  symbolCoords: Coordinate[],
): Coordinate[] => {
  const symbolAdjacentCoords: Coordinate[] = [];

  symbolCoords.forEach((coord) => {
    const { row, column } = coord;
    // ABOVE
    const NW = new Coordinate(column - 1, row - 1);
    const N = new Coordinate(column, row - 1);
    const NE = new Coordinate(column + 1, row - 1);
    // LEFT
    const W = new Coordinate(column - 1, row);
    // RIGHT
    const E = new Coordinate(column + 1, row);
    // BELOW
    const SE = new Coordinate(column + 1, row + 1);
    const S = new Coordinate(column, row + 1);
    const SW = new Coordinate(column - 1, row + 1);

    symbolAdjacentCoords.push(NW, N, NE, W, E, SW, S, SE);
  });

  return symbolAdjacentCoords;
};

export const isPartNumber = (
  numberMatch: NumberMatch,
  symbolAdjacentCoords: Coordinate[],
) => {
  return symbolAdjacentCoords.some((coord) => {
    return numberMatch.coordinates.some((numberCoord) => {
      return (
        coord.row === numberCoord.row && coord.column === numberCoord.column
      );
    });
  });
};

export const getAsteriskNeighbours = (
  asteriskCoord: Coordinate,
  numberMatches: NumberMatch[],
): AsteriskWithNeighbours => {
  const asteriskNeighbourCoords = getSymbolAdjacentCoords([asteriskCoord]);

  const neighbours = numberMatches.filter((numberMatch) => {
    return isPartNumber(numberMatch, asteriskNeighbourCoords);
  });

  return {
    value: "*",
    coordinate: asteriskCoord,
    neighbours,
  };
};

export const sumPartNumbers = (schematic: string[]): number => {
  // Find all numbers in the schematic
  const numberMatches = findNumbers(schematic);

  // Find all symbols in the schematic
  const symbolCoordinates = findSymbols(schematic);

  // Find all neighbour coordinates of symbols
  const symbolAdjacentCoords = getSymbolAdjacentCoords(symbolCoordinates);

  const partNumbers = numberMatches
    // Filter out any numbers which are not next to symbols
    .filter((numberMatch) => isPartNumber(numberMatch, symbolAdjacentCoords))
    // Get the actual number value of each part number
    .map((partNumber) => partNumber.value);

  // Return the sum of the part numbers
  return partNumbers.reduce(add, 0);
};

export const sumGearRatios = (schematic: string[]): number => {
  // Find asterisks
  const asteriskCoordinates = findSymbols(schematic, /\*/g);

  // Find gears: asterisks with exactly two neighbouring numbers
  const numberMatches = findNumbers(schematic);
  const asterisksWithNeighbours = asteriskCoordinates.map((asteriskCoord) =>
    getAsteriskNeighbours(asteriskCoord, numberMatches),
  );
  const gears = asterisksWithNeighbours.filter(
    (a) => a.neighbours.length === 2,
  );

  // Map gears to their ratio (product of the two neighbours)
  const gearRatios = gears.map(
    ({ neighbours }) => neighbours[0].value * neighbours[1].value,
  );

  // Sum the gear ratios
  return gearRatios.reduce(add, 0);
};
