import { DefaultCharRangeGeneratorFactory } from "./char-range-generator/default-char-range-generator-factory";
import { CharsetBuilder } from "./charset-builder/charset-builder";
import { DefaultCharsetBuilderFactory } from "./charset-builder/default-charset-builder-factory";
import * as DefaultCharValidator from "./default-char-validator";
import * as DefaultCharsetIndicesUpdaterFactory from "./string-generator/charset-indices-updater/default-charset-indices-updater-factory";
import { DefaultStringGeneratorFactory } from "./string-generator/default-string-generator-factory";
import { StringGenerator } from "./string-generator/string-generator";
import {
  CharRangeGeneratorCreator,
  StringGeneratorCreator,
} from "./types/function-types";

type PickFromBuilder<K extends keyof StringGeneratorBuilder> = Pick<
  StringGeneratorBuilder,
  K
>;

export type StringGeneratorBuilderStarter = PickFromBuilder<
  | "withStringGeneratorCreator"
  | "withCharsetBuilder"
  | "withCharsetConsistingOf"
>;

export type BuilderStarterExcept<
  K extends keyof PickFromBuilder<
    Exclude<keyof StringGeneratorBuilderStarter, "withCharsetConsistingOf">
  >
> = PickFromBuilder<Exclude<keyof StringGeneratorBuilderStarter, K>>;

export type StringGeneratorBuilderFinisher = PickFromBuilder<"now">;

export type FluentCharsetBuilder = PickFromBuilder<
  Exclude<
    keyof StringGeneratorBuilder,
    keyof StringGeneratorBuilderStarter | keyof StringGeneratorBuilderFinisher
  >
>;

export class StringGeneratorBuilder {
  private createStringGenerator: StringGeneratorCreator;
  private charsetBuilder: CharsetBuilder;

  private constructor() {
    this.createStringGenerator = StringGeneratorBuilder.createDefaultStringGeneratorCreator();
    this.charsetBuilder = StringGeneratorBuilder.createDefaultCharsetBuilder();
  }

  private static createDefaultStringGeneratorCreator(): StringGeneratorCreator {
    const stringGeneratorFactory = new DefaultStringGeneratorFactory(
      DefaultCharsetIndicesUpdaterFactory.createCharsetIndicesUpdater
    );

    return stringGeneratorFactory.createStringGenerator.bind(
      stringGeneratorFactory
    );
  }

  private static createDefaultCharsetBuilder(): CharsetBuilder {
    const createCharRangeGenerator = StringGeneratorBuilder.createDefaultCharRangeGeneratorCreator();

    const charsetBuilderFactory = new DefaultCharsetBuilderFactory(
      DefaultCharValidator.validate,
      createCharRangeGenerator
    );

    return charsetBuilderFactory.createCharsetBuilder();
  }

  private static createDefaultCharRangeGeneratorCreator(): CharRangeGeneratorCreator {
    const charRangeGeneratorFactory = new DefaultCharRangeGeneratorFactory(
      DefaultCharValidator.validate
    );

    return charRangeGeneratorFactory.createCharRangeGenerator.bind(
      charRangeGeneratorFactory
    );
  }

  public static createStringGenerator(): StringGeneratorBuilderStarter {
    return new StringGeneratorBuilder();
  }

  public withStringGeneratorCreator(
    fn: StringGeneratorCreator
  ): BuilderStarterExcept<"withStringGeneratorCreator"> {
    this.createStringGenerator = fn;
    return this;
  }

  public withCharsetBuilder(
    instance: CharsetBuilder
  ): BuilderStarterExcept<"withCharsetBuilder"> {
    this.charsetBuilder = instance;
    return this;
  }

  public withCharsetConsistingOf(): FluentCharsetBuilder {
    return this;
  }

  public this(
    char: string
  ): FluentCharsetBuilder & StringGeneratorBuilderFinisher {
    this.charsetBuilder.addSingle(char);
    return this;
  }

  public these(
    chars: string[]
  ): FluentCharsetBuilder & StringGeneratorBuilderFinisher {
    this.charsetBuilder.addMultiple(chars);
    return this;
  }

  public theHexDigitsInUppercase(): FluentCharsetBuilder &
    StringGeneratorBuilderFinisher {
    return this.theDecimalDigits().theRangeOfCharsBetween("A", "F");
  }

  public theHexDigitsInLowercase(): FluentCharsetBuilder &
    StringGeneratorBuilderFinisher {
    return this.theDecimalDigits().theRangeOfCharsBetween("a", "f");
  }

  public theDecimalDigits(): FluentCharsetBuilder &
    StringGeneratorBuilderFinisher {
    return this.theRangeOfCharsBetween("0", "9");
  }

  public theAlphabetInUppercase(): FluentCharsetBuilder &
    StringGeneratorBuilderFinisher {
    return this.theRangeOfCharsBetween("A", "Z");
  }

  public theAlphabetInLowercase(): FluentCharsetBuilder &
    StringGeneratorBuilderFinisher {
    return this.theRangeOfCharsBetween("a", "z");
  }

  public theRangeOfCharsBetween(
    first: string,
    last: string
  ): FluentCharsetBuilder & StringGeneratorBuilderFinisher {
    this.charsetBuilder.addCharRangeBetween(first, last);
    return this;
  }

  public now(): StringGenerator {
    const charset = this.charsetBuilder.getCharset();
    return this.createStringGenerator(charset);
  }
}
