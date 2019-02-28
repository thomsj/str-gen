import { CharsetBuilder } from "../charset-builder";
import * as DefaultCharsetBuilderFactory from "../default-charset-builder-factory";

describe("DefaultCharsetBuilder", () => {
  let charsetBuilder: CharsetBuilder;

  beforeEach(() => {
    charsetBuilder = DefaultCharsetBuilderFactory.createCharsetBuilder();
  });

  describe("#addSingle()", () => {
    test("adds character parameter to charset", () => {
      const char = "a";
      const expected = [char];

      charsetBuilder.addSingle(char);
      const actual = charsetBuilder.getCharset();
      expect(actual).toEqual(expected);
    });
  });

  describe("#getCharset()", () => {
    test("returns empty array, if nothing added", () => {
      const expected: string[] = [];
      const actual = charsetBuilder.getCharset();
      expect(actual).toEqual(expected);
    });
  });
});
