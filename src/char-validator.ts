export function validate(chars: string[]): void {
  validateLengthsOf(chars);
}

function validateLengthsOf(chars: string[]): void {
  const everyLengthEquals1 = chars.every(lengthEquals1);

  if (!everyLengthEquals1) {
    throw new RangeError(
      "To add a string `char` to the charset, the length of the `char` must be equal to 1."
    );
  }
}

const lengthEquals1 = (char: string): boolean => char.length === 1;
