import { CharsetIndicesUpdaterCreator } from "../types/function-types";
import { StringGenerator } from "./string-generator";

export class DefaultStringGenerator implements StringGenerator {
  private readonly charset: ReadonlyArray<string>;
  private charsetIndices: ReadonlyArray<number> = [];
  private readonly createCharsetIndicesUpdater: CharsetIndicesUpdaterCreator;

  public constructor(
    charset: ReadonlyArray<string>,
    createCharsetIndicesUpdater: CharsetIndicesUpdaterCreator
  ) {
    this.charset = charset;
    this.createCharsetIndicesUpdater = createCharsetIndicesUpdater;
    this.validateCharset();
  }

  private validateCharset(): void {
    this.validateCharsetLength();
    this.validateCharsetStrings();
  }

  private validateCharsetLength(): void {
    if (!this.charset.length) {
      throw new RangeError("Charset must not be empty.");
    }
  }

  private validateCharsetStrings(): void {
    const charsetIncludesEmptyString = this.charset.includes("");

    if (charsetIncludesEmptyString) {
      throw new RangeError(
        `Charset array must not contain empty string ("") element.`
      );
    }
  }

  public generateString(): string {
    this.updateCharsetIndices();
    return this.convertIndicesToString();
  }

  private updateCharsetIndices(): void {
    const charsetIndicesUpdater = this.createCharsetIndicesUpdater(
      this.charsetIndices as number[],
      this.charset.length
    );

    this.charsetIndices = charsetIndicesUpdater.updateCharsetIndices();
  }

  private convertIndicesToString(): string {
    const chars = this.charsetIndices.map(
      charsetIndex => this.charset[charsetIndex]
    );

    return chars.join("");
  }
}
