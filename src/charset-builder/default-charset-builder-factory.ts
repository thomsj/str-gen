import { CharRangeEndpoints } from "../char-range-generator/char-range-endpoints";
import { CharRangeGenerator } from "../char-range-generator/char-range-generator";
import { CharsetBuilder } from "./charset-builder";
import { DefaultCharsetBuilder } from "./default-charset-builder";

export class DefaultCharsetBuilderFactory {
  private readonly validate: (chars: string[]) => void;
  private readonly createCharRangeGenerator: (
    charRangeEndpoints: CharRangeEndpoints
  ) => CharRangeGenerator;

  public constructor(
    validate: (chars: string[]) => void,
    createCharRangeGenerator: (
      charRangeEndpoints: CharRangeEndpoints
    ) => CharRangeGenerator
  ) {
    this.validate = validate;
    this.createCharRangeGenerator = createCharRangeGenerator;
  }

  public createCharsetBuilder(): CharsetBuilder {
    return new DefaultCharsetBuilder(
      this.validate,
      this.createCharRangeGenerator
    );
  }
}
