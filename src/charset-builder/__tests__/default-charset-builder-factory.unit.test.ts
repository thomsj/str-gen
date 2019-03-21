import { DefaultCharRangeGeneratorFactory } from "../../char-range-generator/default-char-range-generator-factory";
import * as CharValidator from "../../char-validator";
import { DefaultCharsetBuilder } from "../default-charset-builder";
import { DefaultCharsetBuilderFactory } from "../default-charset-builder-factory";

describe("DefaultCharsetBuilderFactory", () => {
  describe("#createCharsetBuilder()", () => {
    test("creates DefaultCharsetBuilder instance", () => {
      const charRangeGeneratorFactory = new DefaultCharRangeGeneratorFactory(
        CharValidator.validate
      );

      const charsetBuilderFactory = new DefaultCharsetBuilderFactory(
        CharValidator.validate,
        charRangeGeneratorFactory.createCharRangeGenerator
      );

      const actual = charsetBuilderFactory.createCharsetBuilder();
      expect(actual).toBeInstanceOf(DefaultCharsetBuilder);
    });
  });
});
