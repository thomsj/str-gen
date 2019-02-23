import { DefaultCharsetBuilder } from "../default-charset-builder";
import * as DefaultCharsetBuilderFactory from "../default-charset-builder-factory";

describe("DefaultCharsetBuilderFactory", () => {
  describe(".createCharsetBuilder()", () => {
    test("creates DefaultCharsetBuilder instance", () => {
      const actual = DefaultCharsetBuilderFactory.createCharsetBuilder();
      expect(actual).toBeInstanceOf(DefaultCharsetBuilder);
    });
  });
});
