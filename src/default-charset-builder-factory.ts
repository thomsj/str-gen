import { CharsetBuilder } from "./charset-builder";
import { DefaultCharsetBuilder } from "./default-charset-builder";

export class DefaultCharsetBuilderFactory {
  private readonly validate: (chars: string[]) => void;

  public constructor(validate: (chars: string[]) => void) {
    this.validate = validate;
  }

  public createCharsetBuilder(): CharsetBuilder {
    return new DefaultCharsetBuilder(this.validate);
  }
}
