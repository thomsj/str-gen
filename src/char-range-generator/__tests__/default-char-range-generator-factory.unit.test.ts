import * as DefaultCharValidator from "../../default-char-validator";
import { CharRangeEndpoints } from "../char-range-endpoints";
import { DefaultCharRangeGenerator } from "../default-char-range-generator";
import { DefaultCharRangeGeneratorFactory } from "../default-char-range-generator-factory";

describe("DefaultCharRangeGeneratorFactory", () => {
  describe("#createCharRangeGenerator()", () => {
    test("creates `DefaultCharRangeGenerator` instance", () => {
      const charRangeGeneratorFactory = new DefaultCharRangeGeneratorFactory(
        DefaultCharValidator.validate
      );

      const charRangeEndpoints: CharRangeEndpoints = {
        first: "a",
        last: "b",
      };

      const charRangeGenerator = charRangeGeneratorFactory.createCharRangeGenerator(
        charRangeEndpoints
      );

      expect(charRangeGenerator).toBeInstanceOf(DefaultCharRangeGenerator);
    });
  });
});
