import { CharsetBuilder } from "./charset-builder";

export class DefaultCharsetBuilder implements CharsetBuilder {
  private readonly charset: string[] = [];

  public addSingle(char: string): void {
    this.charset.push(char);
  }

  public getCharset(): string[] {
    return this.charset;
  }
}
