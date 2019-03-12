import { CharsetBuilder } from "./charset-builder";

export class DefaultCharsetBuilder implements CharsetBuilder {
  private readonly charset: string[] = [];

  public addSingle(char: string): void {
    this.validateLengthOf(char);
    this.charset.push(char);
  }

  private validateLengthOf(char: string): void {
    if (char.length !== 1) {
      throw new RangeError("The length of string `char` must be equal to 1.");
    }
  }

  public getCharset(): string[] {
    return this.charset;
  }
}
