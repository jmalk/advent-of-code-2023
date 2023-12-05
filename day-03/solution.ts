const schematic = [
  "467..114..",
  "...*......",
  "..35..633.",
  "......#...",
  "617*......",
  ".....+.58.",
  "..592.....",
  "......755.",
  "...$.*....",
  ".664.598..",
];

export const sumPartNumbers = (schematic: string[]): number => {
  // Find all numbers in the schematic
  // -- For each row of the schematic
  // -- Do a str.matchAll(/\d+/g) to find all numbers
  // -- Maybe record the start and end index of each number? Maybe make a class like NumberMatch (value, row, start, end)

  // Filter out numbers which are not part numbers
  // -- Number is a part number if
  // -- -- There is a symbol (not digit or period) above it
  // -- -- There is a symbol (not digit or period) below it
  // -- -- There is a symbol (not digit or period) left of it
  // -- -- There is a symbol (not digit or period) above-left of it
  // -- -- There is a symbol (not digit or period) below-left of it
  // -- -- There is a symbol (not digit or period) right of it
  // -- -- There is a symbol (not digit or period) above-right of it
  // -- -- There is a symbol (not digit or period) below-right of it

  // Return sum of actual part numbers
  return 0;
};