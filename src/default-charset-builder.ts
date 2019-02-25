import { CharsetBuilder } from "./charset-builder";

export class DefaultCharsetBuilder implements CharsetBuilder {
  private charset: string[] = [];

  public getCharset(): string[] {
    return this.charset;
  }
}
