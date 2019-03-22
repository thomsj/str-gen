import {
  CharRangeGeneratorCreator,
  CharValidator,
} from "../types/function-types";
import { CharsetBuilder } from "./charset-builder";
import { DefaultCharsetBuilder } from "./default-charset-builder";

export class DefaultCharsetBuilderFactory {
  private readonly validate: CharValidator;
  private readonly createCharRangeGenerator: CharRangeGeneratorCreator;

  public constructor(
    validate: CharValidator,
    createCharRangeGenerator: CharRangeGeneratorCreator
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
