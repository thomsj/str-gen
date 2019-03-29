import { DefaultCharsetIndicesUpdater } from "../default-charset-indices-updater";
import * as DefaultCharsetIndicesUpdaterFactory from "../default-charset-indices-updater-factory";

describe("DefaultCharsetIndicesUpdaterFactory", () => {
  describe(".createCharsetIndicesUpdater()", () => {
    test("creates `DefaultCharsetIndicesUpdater` instance", () => {
      const charsetIndices: number[] = [];
      const charsetLength = 1;

      const updater = DefaultCharsetIndicesUpdaterFactory.createCharsetIndicesUpdater(
        charsetIndices,
        charsetLength
      );

      expect(updater).toBeInstanceOf(DefaultCharsetIndicesUpdater);
    });
  });
});
