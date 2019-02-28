export interface CharsetBuilder {
  addSingle(char: string): void;
  getCharset(): string[];
}
