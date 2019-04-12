import * as _ from "lodash";
import { CharValidator } from "../types/function-types";
import { CharRangeEndpoints } from "./char-range-endpoints";
import { CharRangeGenerator } from "./char-range-generator";
import { CodePointRangeEndpoints } from "./code-point-range-endpoints";

export class DefaultCharRangeGenerator implements CharRangeGenerator {
  private readonly charEndpoints: CharRangeEndpoints;

  public constructor(
    charEndpoints: CharRangeEndpoints,
    validate: CharValidator
  ) {
    this.charEndpoints = charEndpoints;
    const charsToValidate = [charEndpoints.first, charEndpoints.last];
    validate(charsToValidate);
  }

  public generateCharRange(): string[] {
    const codePointRange = this.generateCodePointRange();
    return this.toCharRangeFrom(codePointRange);
  }

  private generateCodePointRange(): number[] {
    const codePointEndpoints = this.convertEndpointsFromCharsToCodePoints();
    const sign = codePointEndpoints.last >= codePointEndpoints.first ? 1 : -1;
    return _.range(codePointEndpoints.first, codePointEndpoints.last + sign);
  }

  private convertEndpointsFromCharsToCodePoints(): CodePointRangeEndpoints {
    return {
      first: DefaultCharRangeGenerator.toCodePointFrom(
        this.charEndpoints.first
      ),
      last: DefaultCharRangeGenerator.toCodePointFrom(this.charEndpoints.last),
    };
  }

  private static toCodePointFrom(char: string): number {
    return char.codePointAt(0) as number;
  }

  private toCharRangeFrom(codePointRange: number[]): string[] {
    return codePointRange.map(DefaultCharRangeGenerator.toCharFrom);
  }

  private static toCharFrom(codePoint: number): string {
    return String.fromCodePoint(codePoint);
  }
}
