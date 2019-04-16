import * as DefaultCharValidator from "../default-char-validator";

describe("DefaultCharValidator", () => {
  describe(".validate()", () => {
    describe("throws exception when any string element in `chars` has length not equal to 1", () => {
      test.each([[0], [2]])("length: %i", length => {
        const str = "a".repeat(length);
        const chars = [str];

        expect(() => {
          DefaultCharValidator.validate(chars);
        }).toThrowError(RangeError);
      });
    });
  });
});
