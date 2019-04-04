import * as DefaultCharsetIndicesUpdaterFactory from "../charset-indices-updater/default-charset-indices-updater-factory";
import { DefaultStringGeneratorFactory } from "../default-string-generator-factory";

describe("DefaultStringGenerator", () => {
  const stringGeneratorFactory = new DefaultStringGeneratorFactory(
    DefaultCharsetIndicesUpdaterFactory.createCharsetIndicesUpdater
  );

  const empty = "";
  const a = "a";
  const b = "b";
  const a2 = "aa";
  const b2 = "bb";
  const ab = "ab";
  const ba = "ba";
  const a3 = "aaa";
  const b3 = "bbb";
  const a4 = "aaaa";
  const a6 = "aaaaaa";

  type Charset = string[];

  describe("#constructor()", () => {
    type Charsets = [Charset][];
    type TestName = string;

    // prettier-ignore
    const testData: ReadonlyArray<[TestName, Charsets]> = [
      [
        "throws exception when charset is empty",
        [
          [[]],
        ],
      ],
      [
        "throws exception when charset contains empty string element",
        [
          [[empty]],
          [[a, empty]],
        ],
      ],
    ];

    describe.each(testData)("%s", (_name, charsets) => {
      test.each(charsets)("charset: %j", charset => {
        expect(() => {
          stringGeneratorFactory.createStringGenerator(charset);
        }).toThrowError(RangeError);
      });
    });
  });

  describe("#generateString()", () => {
    type Expecteds = [string][];

    // prettier-ignore
    const testData: ReadonlyArray<[Charset, Expecteds]> = [
      [
        [a],
        [[a], [a2], [a3]],
      ],
      [
        [a, b],
        [[a], [b], [a2], [ab], [ba], [b2], [a3]],
      ],
      [
        [b, a],
        [[b], [a], [b2], [ba], [ab], [a2], [b3]],
      ],
      [
        [a, a],
        [[a], [a], [a2], [a2], [a2], [a2], [a3]],
      ],
      [
        [a2],
        [[a2], [a4], [a6]],
      ],
    ];

    describe.each(testData)(
      "with charset %j, returns consecutively:",
      (charset, expecteds) => {
        const stringGenerator = stringGeneratorFactory.createStringGenerator(
          charset
        );

        test.each(expecteds)("%j", expected => {
          const actual = stringGenerator.generateString();
          expect(actual).toBe(expected);
        });
      }
    );
  });
});
