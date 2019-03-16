import { CharsetBuilder } from "./charset-builder";

export class DefaultCharsetBuilder implements CharsetBuilder {
  private readonly charset: string[] = [];
  private readonly validate: (chars: string[]) => void;

  public constructor(validate: (chars: string[]) => void) {
    this.validate = validate;
  }

  public addSingle(char: string): void {
    const chars = [char];
    this.addMultiple(chars);
  }

  public addMultiple(chars: string[]): void {
    this.validate(chars);
    this.addToCharset(chars);
  }

  private addToCharset(chars: string[]): void {
    this.charset.push(...chars);
  }

  public getCharset(): string[] {
    return this.charset;
  }
}
