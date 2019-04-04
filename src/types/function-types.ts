import { CharRangeEndpoints } from "../char-range-generator/char-range-endpoints";
import { CharRangeGenerator } from "../char-range-generator/char-range-generator";
import { CharsetIndicesUpdater } from "../string-generator/charset-indices-updater/charset-indices-updater";

export type CharValidator = (chars: string[]) => void;

export type CharRangeGeneratorCreator = (
  charRangeEndpoints: CharRangeEndpoints
) => CharRangeGenerator;

export type CharsetIndicesUpdaterCreator = (
  charsetIndices: number[],
  charsetLength: number
) => CharsetIndicesUpdater;
