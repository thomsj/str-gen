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
    const charsToValidate = [charEndpoints.from, charEndpoints.to];
    validate(charsToValidate);
  }

  public generateCharRange(): string[] {
    const codePointRange = this.generateCodePointRange();
    const charRange = this.toCharRangeFrom(codePointRange);
    return charRange;
  }

  private generateCodePointRange(): number[] {
    const codePointEndpoints = this.convertEndpointsFromCharsToCodePoints();
    const sign = codePointEndpoints.to >= codePointEndpoints.from ? 1 : -1;

    const codePointRange = _.range(
      codePointEndpoints.from,
      codePointEndpoints.to + sign
    );

    return codePointRange;
  }

  private convertEndpointsFromCharsToCodePoints(): CodePointRangeEndpoints {
    const codePointEndpoints: CodePointRangeEndpoints = {
      from: DefaultCharRangeGenerator.toCodePointFrom(this.charEndpoints.from),
      to: DefaultCharRangeGenerator.toCodePointFrom(this.charEndpoints.to),
    };

    return codePointEndpoints;
  }

  private static toCodePointFrom(char: string): number {
    return char.codePointAt(0) as number;
  }

  private toCharRangeFrom(codePointRange: number[]): string[] {
    const charRange = codePointRange.map(DefaultCharRangeGenerator.toCharFrom);
    return charRange;
  }

  private static toCharFrom(codePoint: number): string {
    return String.fromCodePoint(codePoint);
  }
}
