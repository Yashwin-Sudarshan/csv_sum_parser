const fs = require("fs");
const { handleFileInput, printOutput, parseFile } = require("../index");
const { it } = require("node:test");

test("parseFile function", () => {
  it("should correctly parse the input csv file and return a map with the correct coordinates and corresponding correctly computed sums", () => {
    const testFile = "test/test.csv";
    const cellSums = parseFile(testFile);
    const expectedResults = new Map([
      ["A1", 15],
      ["B1", 8],
      ["C1", "#ERR"],
      ["D1", 19],
      ["E1", "#ERR"],
      ["A2", "#ERR"],
      ["B2", 9],
      ["C2", "#ERR"],
      ["D2", "#ERR"],
      ["E2", "#ERR"],
      ["F2", "#ERR"],
      ["A3", "#ERR"],
      ["B3", "#ERR"],
      ["C3", "#ERR"],
      ["D3", 52],
      ["E3", "#ERR"],
      ["A4", "#ERR"],
      ["B4", 6],
      ["C4", "#ERR"],
      ["D4", 51],
      ["E4", "#ERR"],
    ]);

    expect(cellSums).toEqual(expectedResults);
  });
});

test("printOutput function", () => {
  it("should correctly print the cell sums to the console in proper format", () => {
    // Mock console.log to capture the output
    const consoleLogSpy = jest
      .spyOn(console, "log")
      .mockImplementation(() => {});

    const cellSums = new Map([
      ["A1", 15],
      ["B1", 8],
      ["C1", "#ERR"],
      ["D1", 19],
      ["E1", "#ERR"],
      ["A2", "#ERR"],
      ["B2", 9],
      ["C2", "#ERR"],
      ["D2", "#ERR"],
      ["E2", "#ERR"],
      ["F2", "#ERR"],
      ["A3", "#ERR"],
      ["B3", "#ERR"],
      ["C3", "#ERR"],
      ["D3", 52],
      ["E3", "#ERR"],
      ["A4", "#ERR"],
      ["B4", "#ERR"],
      ["C4", "#ERR"],
      ["D4", 51],
      ["E4", "#ERR"],
    ]);

    const expectedOutput =
      "15,8,#ERR,19,#ERR\n#ERR,9,#ERR,#ERR,#ERR,#ERR\n#ERR,#ERR,#ERR,52,#ERR\n#ERR,#ERR,#ERR,51,#ERR";
    printOutput(cellSums);

    expect(consoleLogSpy).toHaveBeenCalledWith(expectedOutput);
    consoleLogSpy.mockRestore();
  });
});

test("handleFileInput function", () => {
  it("should throw an error if the provided file does not exist", () => {
    const nonExistentFile = "./not-exist.csv";

    expect(() => handleFileInput(nonExistentFile)).toThrow(
      "File does not exist."
    );
  });

  it("should throw an error if the provided file is not a CSV file", () => {
    const invalidFile = "test/invalid.txt";

    expect(() => handleFileInput(invalidFile)).toThrow(
      "Invalid file format. Please provide a csv file"
    );
  });
});
