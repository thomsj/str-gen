import { CharsetIndicesUpdater } from "./charset-indices-updater";

export class DefaultCharsetIndicesUpdater implements CharsetIndicesUpdater {
  private readonly charsetIndices: number[];
  private readonly charsetLength: number;
  private indexOfIndices: number;

  public constructor(charsetIndices: number[], charsetLength: number) {
    this.charsetIndices = charsetIndices;
    this.charsetLength = charsetLength;
    this.indexOfIndices = this.getIndexOfLastElement();
    this.validateCharsetLength();
  }

  private validateCharsetLength(): void {
    if (this.charsetLength < 1) {
      throw new RangeError(
        "Value of `charsetLength` must be greater than or equal to 1."
      );
    }
  }

  private getIndexOfLastElement(): number {
    return this.charsetIndices.length - 1;
  }

  public updateCharsetIndices(): number[] {
    this.updateStartingWithCurrentElement();
    return this.charsetIndices;
  }

  private updateStartingWithCurrentElement(): void {
    if (this.indexOfIndices === -1) {
      this.prependElement();
      return;
    }

    this.incrementCurrentElement();

    if (this.isCurrentElementPastBoundary()) {
      this.resetCurrentElement();
      this.indexOfIndices--;
      this.updateStartingWithCurrentElement();
    }
  }

  private prependElement(): void {
    this.charsetIndices.unshift(0);
  }

  private incrementCurrentElement(): void {
    this.charsetIndices[this.indexOfIndices]++;
  }

  private isCurrentElementPastBoundary(): boolean {
    return this.charsetIndices[this.indexOfIndices] === this.charsetLength;
  }

  private resetCurrentElement(): void {
    this.charsetIndices[this.indexOfIndices] = 0;
  }
}
