import * as DefaultCharsetBuilderFactory from "../default-charset-builder-factory";

describe("DefaultCharsetBuilder", () => {
  describe("#getCharset()", () => {
    test("returns empty array, if nothing added", () => {
      const charsetBuilder = DefaultCharsetBuilderFactory.createCharsetBuilder();
      const expected: string[] = [];
      const actual = charsetBuilder.getCharset();
      expect(actual).toEqual(expected);
    });
  });
});
