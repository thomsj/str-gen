import { CharsetIndicesUpdaterCreator } from "../types/function-types";
import { DefaultStringGenerator } from "./default-string-generator";
import { StringGenerator } from "./string-generator";

export class DefaultStringGeneratorFactory {
  private readonly createCharsetIndicesUpdater: CharsetIndicesUpdaterCreator;

  public constructor(
    createCharsetIndicesUpdater: CharsetIndicesUpdaterCreator
  ) {
    this.createCharsetIndicesUpdater = createCharsetIndicesUpdater;
  }

  public createStringGenerator(charset: string[]): StringGenerator {
    return new DefaultStringGenerator(
      charset,
      this.createCharsetIndicesUpdater
    );
  }
}
