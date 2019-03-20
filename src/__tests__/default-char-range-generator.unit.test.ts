import { CharRangeEndpoints } from "../char-range-endpoints";
import * as CharValidator from "../char-validator";
import { DefaultCharRangeGeneratorFactory } from "../default-char-range-generator-factory";

describe("DefaultCharRangeGenerator", () => {
  const charRangeGeneratorFactory = new DefaultCharRangeGeneratorFactory(
    CharValidator.validate
  );

  describe("#constructor()", () => {
    test.each([[0, 1], [2, 1], [1, 0], [1, 2]])(
      `throws exception when either endpoint has length not equal to 1
        (lengths: from = %i, to = %i)`,
      (lengthOfFrom, lengthOfTo) => {
        const from = "a".repeat(lengthOfFrom);
        const to = "c".repeat(lengthOfTo);
        const endpoints: CharRangeEndpoints = { from, to };

        expect(() => {
          charRangeGeneratorFactory.createCharRangeGenerator(endpoints);
        }).toThrow(RangeError);
      }
    );
  });

  describe("#generateCharRange()", () => {
    test.each<[string, string, string[]]>([
      ["a", "a", ["a"]],
      ["a", "b", ["a", "b"]],
      ["a", "c", ["a", "b", "c"]],
    ])(
      `returns all characters in range between endpoints (inclusive)
        (from: %s, to: %s, chars: [%s])`,
      (from, to, expected) => {
        const endpoints: CharRangeEndpoints = { from, to };

        const charRangeGenerator = charRangeGeneratorFactory.createCharRangeGenerator(
          endpoints
        );

        const actual = charRangeGenerator.generateCharRange();
        expect(actual).toEqual(expected);
      }
    );
  });
});
