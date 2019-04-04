import * as DefaultCharsetIndicesUpdaterFactory from "../charset-indices-updater/default-charset-indices-updater-factory";
import { DefaultStringGenerator } from "../default-string-generator";
import { DefaultStringGeneratorFactory } from "../default-string-generator-factory";

describe("DefaultStringGeneratorFactory", () => {
  describe("#createStringGenerator()", () => {
    test("creates `DefaultStringGenerator` instance", () => {
      const stringGeneratorFactory = new DefaultStringGeneratorFactory(
        DefaultCharsetIndicesUpdaterFactory.createCharsetIndicesUpdater
      );

      const charset = ["a"];

      const stringGenerator = stringGeneratorFactory.createStringGenerator(
        charset
      );

      expect(stringGenerator).toBeInstanceOf(DefaultStringGenerator);
    });
  });
});
