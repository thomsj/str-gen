import { CharsetBuilder } from "./charset-builder";

export class DefaultCharsetBuilder implements CharsetBuilder {
  private readonly charset: string[] = [];
  private readonly validate: (chars: string[]) => void;

  public constructor(validate: (chars: string[]) => void) {
    this.validate = validate;
  }

  public addSingle(char: string): void {
    this.validate([char]);
    this.charset.push(char);
  }

  public getCharset(): string[] {
    return this.charset;
  }
}
