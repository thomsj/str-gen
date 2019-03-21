import { CharRangeEndpoints } from "../char-range-generator/char-range-endpoints";
import { CharRangeGenerator } from "../char-range-generator/char-range-generator";
import { CharsetBuilder } from "./charset-builder";

export class DefaultCharsetBuilder implements CharsetBuilder {
  private readonly charset: string[] = [];
  private readonly validate: (chars: string[]) => void;
  private readonly createCharRangeGenerator: (
    charRangeEndpoints: CharRangeEndpoints
  ) => CharRangeGenerator;

  public constructor(
    validate: (chars: string[]) => void,
    createCharRangeGenerator: (
      charRangeEndpoints: CharRangeEndpoints
    ) => CharRangeGenerator
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

  public addCharRange(from: string, to: string): void {
    const charRangeEndpoints: CharRangeEndpoints = { from, to };

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
