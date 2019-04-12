import { CharRangeEndpoints } from "../char-range-generator/char-range-endpoints";
import {
  CharRangeGeneratorCreator,
  CharValidator,
} from "../types/function-types";
import { CharsetBuilder } from "./charset-builder";

export class DefaultCharsetBuilder implements CharsetBuilder {
  private readonly charset: string[] = [];
  private readonly validate: CharValidator;
  private readonly createCharRangeGenerator: CharRangeGeneratorCreator;

  public constructor(
    validate: CharValidator,
    createCharRangeGenerator: CharRangeGeneratorCreator
  ) {
    this.validate = validate;
    this.createCharRangeGenerator = createCharRangeGenerator;
  }

  public addSingle(char: string): void {
    const chars = [char];
    this.addMultiple(chars);
  }

  public addMultiple(chars: string[]): void {
    this.validate(chars);
    this.addToCharset(chars);
  }

  public addCharRangeBetween(first: string, last: string): void {
    const charRangeEndpoints: CharRangeEndpoints = { first, last };

    const charRangeGenerator = this.createCharRangeGenerator(
      charRangeEndpoints
    );

    const chars = charRangeGenerator.generateCharRange();
    this.addToCharset(chars);
  }

  private addToCharset(chars: string[]): void {
    this.charset.push(...chars);
  }

  public getCharset(): string[] {
    return this.charset;
  }
}
