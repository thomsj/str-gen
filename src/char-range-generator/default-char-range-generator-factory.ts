import { CharValidator } from "../types/function-types";
import { CharRangeEndpoints } from "./char-range-endpoints";
import { CharRangeGenerator } from "./char-range-generator";
import { DefaultCharRangeGenerator } from "./default-char-range-generator";

export class DefaultCharRangeGeneratorFactory {
  private readonly validate: CharValidator;

  public constructor(validate: CharValidator) {
    this.validate = validate;
  }

  public createCharRangeGenerator(
    charRangeEndpoints: CharRangeEndpoints
  ): CharRangeGenerator {
    return new DefaultCharRangeGenerator(charRangeEndpoints, this.validate);
  }
}
