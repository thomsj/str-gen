import { DefaultCharRangeGeneratorFactory } from "../../char-range-generator/default-char-range-generator-factory";
import * as DefaultCharValidator from "../../default-char-validator";
import { DefaultCharsetBuilder } from "../default-charset-builder";
import { DefaultCharsetBuilderFactory } from "../default-charset-builder-factory";

describe("DefaultCharsetBuilderFactory", () => {
  describe("#createCharsetBuilder()", () => {
    test("creates DefaultCharsetBuilder instance", () => {
      const charRangeGeneratorFactory = new DefaultCharRangeGeneratorFactory(
        DefaultCharValidator.validate
      );

      const charsetBuilderFactory = new DefaultCharsetBuilderFactory(
        DefaultCharValidator.validate,
        charRangeGeneratorFactory.createCharRangeGenerator
      );

      const actual = charsetBuilderFactory.createCharsetBuilder();
      expect(actual).toBeInstanceOf(DefaultCharsetBuilder);
    });
  });
});
