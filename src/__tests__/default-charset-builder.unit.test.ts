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

    test.each([[0], [2]])(
      "throws exception when length of string is not equal to 1 (length: %i)",
      length => {
        const str = "a".repeat(length);

        expect(() => {
          charsetBuilder.addSingle(str);
        }).toThrowError(RangeError);
      }
    );
  });

  describe("#getCharset()", () => {
    test("returns empty array, if nothing added", () => {
      const expected: string[] = [];
      const actual = charsetBuilder.getCharset();
      expect(actual).toEqual(expected);
    });
  });
});
