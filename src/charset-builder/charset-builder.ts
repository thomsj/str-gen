export interface CharsetBuilder {
  addSingle(char: string): void;
  addMultiple(chars: string[]): void;
  addCharRange(from: string, to: string): void;
  getCharset(): string[];
}
