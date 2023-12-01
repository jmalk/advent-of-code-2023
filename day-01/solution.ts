const numbers = {
  zero: "0",
  one: "1",
  two: "2",
  three: "3",
  four: "4",
  five: "5",
  six: "6",
  seven: "7",
  eight: "8",
  nine: "9",
} as const;

const getNumber = (value: string, includeWords: boolean = true) => {
  const digits = includeWords
    ? /[0-9]|one|two|three|four|five|six|seven|eight|nine/g
    : /[0-9]/g;

  // Get all digits
  const digitsInValue = value.match(digits);

  if (!digitsInValue) {
    return 0;
  }

  // Get first digit
  let firstDigit = digitsInValue[0];

  // Get last digit
  let lastDigit = digitsInValue[digitsInValue.length - 1];

  // Map words to actual digits
  if (Object.keys(numbers).includes(firstDigit)) {
    firstDigit = numbers[firstDigit];
  }
  if (Object.keys(numbers).includes(lastDigit)) {
    lastDigit = numbers[lastDigit];
  }

  // Combine digits
  const twoDigits = `${firstDigit}${lastDigit}`;

  // Parse two digits as number
  const number = parseInt(twoDigits);

  return number;
};

// The includeWords flag determines whether "one" is used as "1" or not, when
// looking for digits in the given strings.
export const sumCalibrationValues = (
  values: string[],
  includeWords: boolean = true,
): number => {
  const numbers = values.map((val) => getNumber(val, includeWords));

  const sum = numbers.reduce((a, b) => a + b);

  return sum;
};
