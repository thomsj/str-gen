import * as CharValidator from "../char-validator";
import { DefaultCharsetBuilder } from "../default-charset-builder";
import { DefaultCharsetBuilderFactory } from "../default-charset-builder-factory";

describe("DefaultCharsetBuilderFactory", () => {
  describe("#createCharsetBuilder()", () => {
    test("creates DefaultCharsetBuilder instance", () => {
      const charsetBuilderFactory = new DefaultCharsetBuilderFactory(
        CharValidator.validate
      );

      const actual = charsetBuilderFactory.createCharsetBuilder();
      expect(actual).toBeInstanceOf(DefaultCharsetBuilder);
    });
  });
});
