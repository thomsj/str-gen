import { CharRangeEndpoints } from "../char-range-generator/char-range-endpoints";
import { CharRangeGenerator } from "../char-range-generator/char-range-generator";

export type CharValidator = (chars: string[]) => void;

export type CharRangeGeneratorCreator = (
  charRangeEndpoints: CharRangeEndpoints
) => CharRangeGenerator;
