import { CharsetBuilder } from "../charset-builder/charset-builder";
import {
  BuilderStarterExcept,
  FluentCharsetBuilder,
  StringGeneratorBuilder,
  StringGeneratorBuilderStarter,
} from "../string-generator-builder";
import { DefaultStringGenerator } from "../string-generator/default-string-generator";

describe("StringGeneratorBuilder", () => {
  const a = "a";
  const b = "b";
  const c = "c";
  const f = "f";
  const z = "z";
  const upperA = "A";
  const upperF = "F";
  const upperZ = "Z";
  const zero = "0";
  const nine = "9";

  const mockModule: {
    DefaultCharsetBuilder: new () => CharsetBuilder;
  } = jest.genMockFromModule("../charset-builder/default-charset-builder");

  const MockCharsetBuilder = mockModule.DefaultCharsetBuilder;
  let mockCharsetBuilder: CharsetBuilder;
  let stringGeneratorBuilder: StringGeneratorBuilderStarter;

  beforeEach(() => {
    mockCharsetBuilder = new MockCharsetBuilder();
    stringGeneratorBuilder = StringGeneratorBuilder.createStringGenerator();
  });

  describe(".createStringGenerator()", () => {
    test("returns `StringGeneratorBuilder` instance", () => {
      expect(stringGeneratorBuilder).toBeInstanceOf(StringGeneratorBuilder);
    });
  });

  describe("#withStringGeneratorCreator()", () => {
    const mockCreatorFn = jest.fn();
    let builder: BuilderStarterExcept<"withStringGeneratorCreator">;

    beforeEach(() => {
      builder = stringGeneratorBuilder.withStringGeneratorCreator(
        mockCreatorFn
      );
    });

    test("returns `this` object", () => {
      expect(builder).toBe(stringGeneratorBuilder);
    });

    test("sets the creator function to call in `now()`", () => {
      const char = a;

      builder
        .withCharsetConsistingOf()
        .this(char)
        .now();

      expect(mockCreatorFn).toHaveBeenCalledWith([char]);
    });
  });

  describe("#withCharsetBuilder()", () => {
    let builder: BuilderStarterExcept<"withCharsetBuilder">;

    beforeEach(() => {
      builder = stringGeneratorBuilder.withCharsetBuilder(mockCharsetBuilder);
    });

    test("returns `this` object", () => {
      expect(builder).toBe(stringGeneratorBuilder);
    });

    test("sets charset builder to use in subsequent methods", () => {
      const char = a;
      builder.withCharsetConsistingOf().this(char);
      expect(mockCharsetBuilder.addSingle).toHaveBeenCalledWith(char);
    });
  });

  describe("#withCharsetConsistingOf()", () => {
    test("returns `this` object", () => {
      const builder = stringGeneratorBuilder.withCharsetConsistingOf();
      expect(builder).toBe(stringGeneratorBuilder);
    });
  });

  describe("#this()", () => {
    let charsetBuilder: FluentCharsetBuilder;

    beforeEach(() => {
      charsetBuilder = stringGeneratorBuilder.withCharsetConsistingOf();
    });

    test("returns `this` object", () => {
      const builder = charsetBuilder.this(a);
      expect(builder).toBe(stringGeneratorBuilder);
    });

    test.each([[0], [2]])(
      "throws exception when length of string is not equal to 1 (length: %i)",
      length => {
        const str = a.repeat(length);

        expect(() => {
          charsetBuilder.this(str);
        }).toThrowError(RangeError);
      }
    );

    test.each([[a], [b], [c]])("adds char to charset (char: %j)", char => {
      const expected = char;
      const stringGenerator = charsetBuilder.this(char).now();
      const actual = stringGenerator.generateString();
      expect(actual).toBe(expected);
    });
  });

  describe("#these()", () => {
    test("returns `this` object", () => {
      const builder = stringGeneratorBuilder
        .withCharsetConsistingOf()
        .these([a, b]);

      expect(builder).toBe(stringGeneratorBuilder);
    });

    test.each([[0], [2]])(
      "throws exception when any string element in `chars` has length not equal to 1 (length: %i)",
      length => {
        const str = b.repeat(length);
        const chars = [a, str, c];
        const builder = stringGeneratorBuilder.withCharsetConsistingOf();

        expect(() => {
          builder.these(chars);
        }).toThrowError(RangeError);
      }
    );

    test("adds chars to charset", () => {
      const chars = [a, b, c];

      stringGeneratorBuilder
        .withCharsetBuilder(mockCharsetBuilder)
        .withCharsetConsistingOf()
        .these(chars);

      expect(mockCharsetBuilder.addMultiple).toHaveBeenCalledWith(chars);
    });
  });

  describe("#theHexDigitsInUppercase()", () => {
    test("returns `this` object", () => {
      const builder = stringGeneratorBuilder
        .withCharsetConsistingOf()
        .theHexDigitsInUppercase();

      expect(builder).toBe(stringGeneratorBuilder);
    });

    test(`calls \`addCharRangeBetween()\` method of \`charsetBuilder\`,
        with \`first\` = "0", \`last\` = "9",
        then \`first\` = "A", \`last\` = "F"`, () => {
      stringGeneratorBuilder
        .withCharsetBuilder(mockCharsetBuilder)
        .withCharsetConsistingOf()
        .theHexDigitsInUppercase();

      expect(mockCharsetBuilder.addCharRangeBetween).toHaveBeenNthCalledWith(
        1,
        zero,
        nine
      );

      expect(mockCharsetBuilder.addCharRangeBetween).toHaveBeenLastCalledWith(
        upperA,
        upperF
      );
    });
  });

  describe("#theHexDigitsInLowercase()", () => {
    test("returns `this` object", () => {
      const builder = stringGeneratorBuilder
        .withCharsetConsistingOf()
        .theHexDigitsInLowercase();

      expect(builder).toBe(stringGeneratorBuilder);
    });

    test(`calls \`addCharRangeBetween()\` method of \`charsetBuilder\`,
        with \`first\` = "0", \`last\` = "9",
        then \`first\` = "a", \`last\` = "f"`, () => {
      stringGeneratorBuilder
        .withCharsetBuilder(mockCharsetBuilder)
        .withCharsetConsistingOf()
        .theHexDigitsInLowercase();

      expect(mockCharsetBuilder.addCharRangeBetween).toHaveBeenNthCalledWith(
        1,
        zero,
        nine
      );

      expect(mockCharsetBuilder.addCharRangeBetween).toHaveBeenLastCalledWith(
        a,
        f
      );
    });
  });

  describe("#theDecimalDigits()", () => {
    test("returns `this` object", () => {
      const builder = stringGeneratorBuilder
        .withCharsetConsistingOf()
        .theDecimalDigits();

      expect(builder).toBe(stringGeneratorBuilder);
    });

    test(`calls \`addCharRangeBetween()\` method of \`charsetBuilder\`,
        with \`first\` = "0", \`last\` = "9"`, () => {
      stringGeneratorBuilder
        .withCharsetBuilder(mockCharsetBuilder)
        .withCharsetConsistingOf()
        .theDecimalDigits();

      expect(mockCharsetBuilder.addCharRangeBetween).toHaveBeenCalledWith(
        zero,
        nine
      );
    });
  });

  describe("#theAlphabetInUppercase()", () => {
    test("returns `this` object", () => {
      const builder = stringGeneratorBuilder
        .withCharsetConsistingOf()
        .theAlphabetInUppercase();

      expect(builder).toBe(stringGeneratorBuilder);
    });

    test(`calls \`addCharRangeBetween()\` method of \`charsetBuilder\`,
        with \`first\` = "A", \`last\` = "Z"`, () => {
      stringGeneratorBuilder
        .withCharsetBuilder(mockCharsetBuilder)
        .withCharsetConsistingOf()
        .theAlphabetInUppercase();

      expect(mockCharsetBuilder.addCharRangeBetween).toHaveBeenCalledWith(
        upperA,
        upperZ
      );
    });
  });

  describe("#theAlphabetInLowercase()", () => {
    test("returns `this` object", () => {
      const builder = stringGeneratorBuilder
        .withCharsetConsistingOf()
        .theAlphabetInLowercase();

      expect(builder).toBe(stringGeneratorBuilder);
    });

    test(`calls \`addCharRangeBetween()\` method of \`charsetBuilder\`,
        with \`first\` = "a", \`last\` = "z"`, () => {
      stringGeneratorBuilder
        .withCharsetBuilder(mockCharsetBuilder)
        .withCharsetConsistingOf()
        .theAlphabetInLowercase();

      expect(mockCharsetBuilder.addCharRangeBetween).toHaveBeenCalledWith(a, z);
    });
  });

  describe("#theRangeOfCharsBetween()", () => {
    test("returns `this` object", () => {
      const builder = stringGeneratorBuilder
        .withCharsetConsistingOf()
        .theRangeOfCharsBetween(a, c);

      expect(builder).toBe(stringGeneratorBuilder);
    });

    test.each([[0, 1], [2, 1], [1, 0], [1, 2]])(
      `throws exception when either endpoint has length not equal to 1
        (lengths: \`first\` = %i, \`last\` = %i)`,
      (lengthOfFirst, lengthOfLast) => {
        const first = a.repeat(lengthOfFirst);
        const last = c.repeat(lengthOfLast);
        const builder = stringGeneratorBuilder.withCharsetConsistingOf();

        expect(() => {
          builder.theRangeOfCharsBetween(first, last);
        }).toThrowError(RangeError);
      }
    );

    test("calls `addCharRangeBetween()` method of `charsetBuilder`", () => {
      const first = a;
      const last = c;

      stringGeneratorBuilder
        .withCharsetBuilder(mockCharsetBuilder)
        .withCharsetConsistingOf()
        .theRangeOfCharsBetween(first, last);

      expect(mockCharsetBuilder.addCharRangeBetween).toHaveBeenCalledWith(
        first,
        last
      );
    });
  });

  describe("#now()", () => {
    test("returns `DefaultStringGenerator` instance, by default", () => {
      const stringGenerator = stringGeneratorBuilder
        .withCharsetConsistingOf()
        .this(a)
        .now();

      expect(stringGenerator).toBeInstanceOf(DefaultStringGenerator);
    });

    test("throws exception when charset is empty", () => {
      const builder = stringGeneratorBuilder
        .withCharsetConsistingOf()
        .these([]);

      expect(() => {
        builder.now();
      }).toThrowError(RangeError);
    });

    test("calls `createStringGenerator()` with charset output from `charsetBuilder`", () => {
      const mockCreatorFn = jest.fn();
      const chars = [a, b, c];

      stringGeneratorBuilder
        .withStringGeneratorCreator(mockCreatorFn)
        .withCharsetConsistingOf()
        .these(chars)
        .now();

      expect(mockCreatorFn).toHaveBeenCalledWith(chars);
    });
  });
});
