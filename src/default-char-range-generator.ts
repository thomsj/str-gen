import * as _ from "lodash";
import { CharRangeEndpoints } from "./char-range-endpoints";
import { CharRangeGenerator } from "./char-range-generator";
import { CodePointRangeEndpoints } from "./code-point-range-endpoints";

export class DefaultCharRangeGenerator implements CharRangeGenerator {
  private readonly charEndpoints: CharRangeEndpoints;
  private codePointEndpoints!: CodePointRangeEndpoints;
  private codePointRange!: number[];
  private charRange!: string[];

  public constructor(
    charEndpoints: CharRangeEndpoints,
    validate: (chars: string[]) => void
  ) {
    this.charEndpoints = charEndpoints;
    const charsToValidate = [charEndpoints.from, charEndpoints.to];
    validate(charsToValidate);
  }

  public generateCharRange(): string[] {
    this.generateCodePointRange();
    this.mapCodePointRangeToCharRange();
    return this.charRange;
  }

  private generateCodePointRange(): void {
    this.convertEndpointsFromCharsToCodePoints();

    this.codePointRange = _.range(
      this.codePointEndpoints.from,
      this.codePointEndpoints.to + 1
    );
  }

  private convertEndpointsFromCharsToCodePoints(): void {
    this.codePointEndpoints = {
      from: DefaultCharRangeGenerator.toCodePointFrom(this.charEndpoints.from),
      to: DefaultCharRangeGenerator.toCodePointFrom(this.charEndpoints.to),
    };
  }

  private static toCodePointFrom(char: string): number {
    return char.codePointAt(0) as number;
  }

  private mapCodePointRangeToCharRange(): void {
    this.charRange = this.codePointRange.map(
      DefaultCharRangeGenerator.toCharFrom
    );
  }

  private static toCharFrom(codePoint: number): string {
    return String.fromCodePoint(codePoint);
  }
}
