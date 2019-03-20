import { CharRangeEndpoints } from "./char-range-endpoints";
import { CharRangeGenerator } from "./char-range-generator";
import { DefaultCharRangeGenerator } from "./default-char-range-generator";

export class DefaultCharRangeGeneratorFactory {
  private readonly validate: (chars: string[]) => void;

  public constructor(validate: (chars: string[]) => void) {
    this.validate = validate;
  }

  public createCharRangeGenerator(
    charRangeEndpoints: CharRangeEndpoints
  ): CharRangeGenerator {
    return new DefaultCharRangeGenerator(charRangeEndpoints, this.validate);
  }
}
