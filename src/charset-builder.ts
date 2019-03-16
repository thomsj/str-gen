export interface CharsetBuilder {
  addSingle(char: string): void;
  addMultiple(chars: string[]): void;
  getCharset(): string[];
}
