const getNumber = (value: string) => {
  const digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

  // Get all digits
  const digitsInValue = value.split("").filter((c) => digits.includes(c));

  // Get first digit
  const firstDigit = digitsInValue[0];

  // Get last digit
  const lastDigit = digitsInValue[digitsInValue.length - 1];

  // Combine digits
  const twoDigits = `${firstDigit}${lastDigit}`;

  // Parse two digits as number
  const number = parseInt(twoDigits);

  return number;
};

export const sumCalibrationValues = (values: string[]): number => {
  const numbers = values.map(getNumber);

  const sum = numbers.reduce((a, b) => a + b);

  return sum;
};
