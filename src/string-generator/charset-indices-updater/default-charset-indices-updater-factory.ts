import { CharsetIndicesUpdater } from "./charset-indices-updater";
import { DefaultCharsetIndicesUpdater } from "./default-charset-indices-updater";

export const createCharsetIndicesUpdater = (
  charsetIndices: number[],
  charsetLength: number
): CharsetIndicesUpdater =>
  new DefaultCharsetIndicesUpdater(charsetIndices, charsetLength);
