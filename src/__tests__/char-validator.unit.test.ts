import * as CharValidator from "../char-validator";

describe("CharValidator", () => {
  describe(".validate()", () => {
    test.each([[0], [2]])(
      "throws exception when any string element in `chars` has length not equal to 1 (length: %i)",
      length => {
        const str = "a".repeat(length);
        const chars = [str];

        expect(() => {
          CharValidator.validate(chars);
        }).toThrowError(RangeError);
      }
    );
  });
});
