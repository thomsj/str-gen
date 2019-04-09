import * as DefaultCharValidator from "../../default-char-validator";
import { DefaultCharsetBuilder } from "../default-charset-builder";
import { DefaultCharsetBuilderFactory } from "../default-charset-builder-factory";

describe("DefaultCharsetBuilderFactory", () => {
  describe("#createCharsetBuilder()", () => {
    test("creates `DefaultCharsetBuilder` instance", () => {
      const mockCharRangeGeneratorCreator = jest.fn();

      const charsetBuilderFactory = new DefaultCharsetBuilderFactory(
        DefaultCharValidator.validate,
        mockCharRangeGeneratorCreator
      );

      const charsetBuilder = charsetBuilderFactory.createCharsetBuilder();
      expect(charsetBuilder).toBeInstanceOf(DefaultCharsetBuilder);
    });
  });
});
