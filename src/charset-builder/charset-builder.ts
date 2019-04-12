export interface CharsetBuilder {
  addSingle(char: string): void;
  addMultiple(chars: string[]): void;
  addCharRangeBetween(first: string, last: string): void;
  getCharset(): string[];
}
