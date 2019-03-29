import * as DefaultCharsetIndicesUpdaterFactory from "../default-charset-indices-updater-factory";

describe("DefaultCharsetIndicesUpdater", () => {
  describe("#constructor()", () => {
    test("throws exception when `charsetLength` is zero", () => {
      const charsetIndices: number[] = [];
      const charsetLength = 0;

      expect(() => {
        DefaultCharsetIndicesUpdaterFactory.createCharsetIndicesUpdater(
          charsetIndices,
          charsetLength
        );
      }).toThrowError(RangeError);
    });
  });

  describe("#updateCharsetIndices()", () => {
    type CharsetLength = number;
    type IndicesAndExpected = [number[], number[]];

    // prettier-ignore
    const testData: ReadonlyArray<[CharsetLength, IndicesAndExpected[]]> = [
      [
        1,
        [
          [[],      [0]],
          [[0],     [0, 0]],
          [[0, 0],  [0, 0, 0]],
        ],
      ],
      [
        2,
        [
          [[],      [0]],
          [[0],     [1]],
          [[1],     [0, 0]],
          [[0, 0],  [0, 1]],
          [[0, 1],  [1, 0]],
          [[1, 0],  [1, 1]],
          [[1, 1],  [0, 0, 0]],
        ],
      ],
      [
        3,
        [
          [[],      [0]],
          [[0],     [1]],
          [[1],     [2]],
          [[2],     [0, 0]],
          [[0, 0],  [0, 1]],
          [[0, 1],  [0, 2]],
          [[0, 2],  [1, 0]],
          [[1, 0],  [1, 1]],
          [[1, 1],  [1, 2]],
          [[1, 2],  [2, 0]],
          [[2, 0],  [2, 1]],
          [[2, 1],  [2, 2]],
          [[2, 2],  [0, 0, 0]],
        ],
      ],
    ];

    describe.each(testData)(
      "with `charsetLength`: %d",
      (charsetLength, dataForCurrentLength) => {
        test.each(dataForCurrentLength)(
          "with `charsetIndices`: %j, returns %j",
          (charsetIndices, expected) => {
            const updater = DefaultCharsetIndicesUpdaterFactory.createCharsetIndicesUpdater(
              charsetIndices,
              charsetLength
            );

            const actual = updater.updateCharsetIndices();
            expect(actual).toEqual(expected);
          }
        );
      }
    );
  });
});
