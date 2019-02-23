import { CharsetBuilder } from "./charset-builder";
import { DefaultCharsetBuilder } from "./default-charset-builder";

export function createCharsetBuilder(): CharsetBuilder {
  return new DefaultCharsetBuilder();
}
