import { add } from "../lib";

export type Coordinate = {
  row: number;
  column: number;
};

export type NumberMatch = {
  value: number;
  row: number;
  start: number;
  end: number;
};

export type NumberMatch2 = {
  value: number;
  coordinates: Coordinate[];
};

export const findNumbers = (schematic: string[]): NumberMatch[] => {
  const numberMatches: NumberMatch[] = [];
  const digits = /\d+/g;

  schematic.forEach((row, index) => {
    const matchesInRow = [...row.matchAll(digits)];

    matchesInRow.forEach((match) => {
      const numberString = match[0];

      numberMatches.push({
        value: parseInt(numberString),
        row: index,
        start: match.index,
        end: match.index + numberString.length - 1,
      });
    });
  });

  return numberMatches;
};

export const findSymbols = (schematic: string[]): Coordinate[] => {
  const locations: Coordinate[] = [];
  // Caret in character set means NOT one of these
  const symbol = /[^0-9.]/g;

  schematic.forEach((row, index) => {
    const matchesInRow = [...row.matchAll(symbol)];

    matchesInRow.forEach((match) => {
      locations.push({
        row: index,
        column: match.index,
      });
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
    const NW = {
      row: row - 1,
      column: column - 1,
    };
    const N = {
      row: row - 1,
      column: column,
    };
    const NE = {
      row: row - 1,
      column: column + 1,
    };
    // LEFT
    const W = {
      row: row,
      column: column - 1,
    };
    // RIGHT
    const E = {
      row: row,
      column: column + 1,
    };
    // BELOW
    const SE = {
      row: row + 1,
      column: column + 1,
    };
    const S = {
      row: row + 1,
      column: column,
    };
    const SW = {
      row: row + 1,
      column: column - 1,
    };

    symbolAdjacentCoords.push(NW, N, NE, W, E, SW, S, SE);
  });

  return symbolAdjacentCoords;
};

export const isPartNumber = (
  numberMatch: NumberMatch2,
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

export const sumPartNumbers = (schematic: string[]): number => {
  // Find all numbers in the schematic
  const numberMatches = findNumbers(schematic);
  const symbolCoordinates = findSymbols(schematic);
  const symbolAdjacentCoords = getSymbolAdjacentCoords(symbolCoordinates);

  const partNumbers = numberMatches.filter((numberMatch) =>
    isPartNumber(numberMatch, symbolAdjacentCoords),
  );

  // Return sum of actual part numbers
  return partNumbers.reduce(add, 0);
};
