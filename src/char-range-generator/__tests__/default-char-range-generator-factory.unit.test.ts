import * as CharValidator from "../../char-validator";
import { CharRangeEndpoints } from "../char-range-endpoints";
import { DefaultCharRangeGenerator } from "../default-char-range-generator";
import { DefaultCharRangeGeneratorFactory } from "../default-char-range-generator-factory";

describe("DefaultCharRangeGeneratorFactory", () => {
  describe("#createCharRangeGenerator()", () => {
    test("creates DefaultCharRangeGenerator instance", () => {
      const charRangeGeneratorFactory = new DefaultCharRangeGeneratorFactory(
        CharValidator.validate
      );

      const charRangeEndpoints: CharRangeEndpoints = {
        from: "a",
        to: "b",
      };

      const charRangeGenerator = charRangeGeneratorFactory.createCharRangeGenerator(
        charRangeEndpoints
      );

      expect(charRangeGenerator).toBeInstanceOf(DefaultCharRangeGenerator);
    });
  });
});
