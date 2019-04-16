import * as DefaultCharValidator from "../../default-char-validator";
import { CharRangeEndpoints } from "../char-range-endpoints";
import { DefaultCharRangeGeneratorFactory } from "../default-char-range-generator-factory";

describe("DefaultCharRangeGenerator", () => {
  const a = "a";
  const b = "b";
  const c = "c";

  const charRangeGeneratorFactory = new DefaultCharRangeGeneratorFactory(
    DefaultCharValidator.validate
  );

  describe("#constructor()", () => {
    test.each([[0, 1], [2, 1], [1, 0], [1, 2]])(
      `throws exception when either endpoint has length not equal to 1
        (lengths: \`first\` = %i, \`last\` = %i)`,
      (lengthOfFirst, lengthOfLast) => {
        const first = a.repeat(lengthOfFirst);
        const last = c.repeat(lengthOfLast);
        const endpoints: CharRangeEndpoints = { first, last };

        expect(() => {
          charRangeGeneratorFactory.createCharRangeGenerator(endpoints);
        }).toThrowError(RangeError);
      }
    );
  });

  describe("#generateCharRange()", () => {
    test.each<[string, string, string[]]>([
      [a, a, [a]],
      [a, b, [a, b]],
      [b, a, [b, a]],
      [a, c, [a, b, c]],
      [c, a, [c, b, a]],
    ])(
      `returns all characters in range between endpoints (inclusive)
        (\`first\`: %j, \`last\`: %j, chars: %j)`,
      (first, last, expected) => {
        const endpoints: CharRangeEndpoints = { first, last };

        const charRangeGenerator = charRangeGeneratorFactory.createCharRangeGenerator(
          endpoints
        );

        const actual = charRangeGenerator.generateCharRange();
        expect(actual).toEqual(expected);
      }
    );
  });
});
