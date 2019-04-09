import { DefaultCharRangeGeneratorFactory } from "../../char-range-generator/default-char-range-generator-factory";
import * as DefaultCharValidator from "../../default-char-validator";
import { CharsetBuilder } from "../charset-builder";
import { DefaultCharsetBuilderFactory } from "../default-charset-builder-factory";

describe("DefaultCharsetBuilder", () => {
  const a = "a";
  const b = "b";
  const c = "c";

  const charRangeGeneratorFactory = new DefaultCharRangeGeneratorFactory(
    DefaultCharValidator.validate
  );

  const createCharRangeGenerator = charRangeGeneratorFactory.createCharRangeGenerator.bind(
    charRangeGeneratorFactory
  );

  const charsetBuilderFactory = new DefaultCharsetBuilderFactory(
    DefaultCharValidator.validate,
    createCharRangeGenerator
  );

  let charsetBuilder: CharsetBuilder;

  beforeEach(() => {
    charsetBuilder = charsetBuilderFactory.createCharsetBuilder();
  });

  describe("#addSingle()", () => {
    test("adds character parameter to charset", () => {
      const char = a;
      const expected = [char];

      charsetBuilder.addSingle(char);
      const actual = charsetBuilder.getCharset();
      expect(actual).toEqual(expected);
    });

    test.each([[0], [2]])(
      "throws exception when length of string is not equal to 1 (length: %i)",
      length => {
        const str = a.repeat(length);

        expect(() => {
          charsetBuilder.addSingle(str);
        }).toThrowError(RangeError);
      }
    );
  });

  describe("#addMultiple()", () => {
    test("adds all characters in array parameter to charset", () => {
      const chars = [a, b, c];
      const expected = chars;

      charsetBuilder.addMultiple(chars);
      const actual = charsetBuilder.getCharset();
      expect(actual).toEqual(expected);
    });

    test.each([[0], [2]])(
      "throws exception when any string element in `chars` has length not equal to 1 (length: %i)",
      length => {
        const str = b.repeat(length);
        const chars = [a, str, c];

        expect(() => {
          charsetBuilder.addMultiple(chars);
        }).toThrowError(RangeError);
      }
    );
  });

  describe("#addCharRange()", () => {
    test("calls `validate` function property of `charRangeGeneratorFactory`", () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const spy = jest.spyOn(charRangeGeneratorFactory, "validate" as any);

      charsetBuilder.addCharRange(a, c);
      expect(spy).toHaveBeenCalledWith([a, c]);
    });

    test.each([[0, 1], [2, 1], [1, 0], [1, 2]])(
      `throws exception when either \`from\` or \`to\` has length not equal to 1
        (lengths: from = %i, to = %i)`,
      (lengthOfFrom, lengthOfTo) => {
        const from = a.repeat(lengthOfFrom);
        const to = c.repeat(lengthOfTo);

        expect(() => {
          charsetBuilder.addCharRange(from, to);
        }).toThrowError(RangeError);
      }
    );

    test.each<[string, string, string[]]>([
      [a, a, [a]],
      [a, b, [a, b]],
      [b, a, [b, a]],
      [a, c, [a, b, c]],
      [c, a, [c, b, a]],
    ])(
      `adds all characters in range from \`from\` (inclusive) to \`to\` (inclusive)
        (from: %s, to: %s, chars: [%s])`,
      (from, to, expected) => {
        charsetBuilder.addCharRange(from, to);
        const actual = charsetBuilder.getCharset();
        expect(actual).toEqual(expected);
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
