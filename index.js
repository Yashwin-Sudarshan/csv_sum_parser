const fs = require("fs");

function parseFile(fileName) {
  const cellSums = new Map();

  const errorMesg = "#ERR";
  const cellCoordinateRegex = /^[A-Za-z][0-9]+$/;

  const fileContent = fs.readFileSync(fileName, "utf-8");
  const lines = fileContent.trim().split("\n");

  let row = 1;
  let col = 1;

  // Iterate over file lines
  lines.forEach((line) => {
    col = 1;
    const cells = line.trim().split(",");

    // Iterate over cells in the current line
    cells.forEach((cell) => {
      const tokens = cell.trim().split(" ");
      let sum = 0;
      let isError = false;

      // Iterate over tokens in the current cell
      tokens.forEach((token) => {
        if (token !== "") {
          // Checks if token is a number using equal to self check
          if (+token === +token) {
            sum += Number(token);
          }
          // Checks if token is a letter-number combination
          else if (cellCoordinateRegex.test(token)) {
            if (
              cellSums.has(token.toUpperCase()) &&
              cellSums.get(token.toUpperCase()) !== errorMesg
            ) {
              sum += cellSums.get(token.toUpperCase());
            }
            // Cell has not been visited and therefore is assumed to not exist
            else {
              isError = true;
            }
          } else {
            isError = true;
          }
        } else {
          isError = true;
        }
      });

      // Storing visited cells with their coordinates and sums.
      // String.fromCharCode is converting number coordinates to letters.
      if (isError) {
        cellSums.set(String.fromCharCode(64 + col) + row, errorMesg);
      } else {
        cellSums.set(String.fromCharCode(64 + col) + row, sum);
      }

      col += 1;
    });

    row += 1;
  });

  return cellSums;
}

function printOutput(cellSums) {
  let prevKey = null;
  let output = "";
  cellSums.forEach((value, key) => {
    // If current key contains same number as previous key,
    // then current cell is on the same row
    if (prevKey !== null) {
      if (key.charAt(1) === prevKey.charAt(1)) {
        output += ",";
      } else {
        output += "\n";
      }
    }
    output += value;
    prevKey = key;
  });

  console.log(output);
}

function handleFileInput(fileName) {
  // Check if file exists
  if (!fs.existsSync(fileName)) {
    throw new Error("File does not exist.");
  }
  // Check if file is a csv file
  if (!fileName.endsWith(".csv")) {
    throw new Error("Invalid file format. Please provide a csv file");
  }
}

function main() {
  // Get file from user input
  const args = process.argv.slice(2);
  if (args.length !== 1) {
    // Set red text for error message. Red color code: \x1b[31m, Reset color code: \x1b[0m
    console.error(
      "\x1b[31mError: Invalid usage. For proper usage --> node index.js <input csv filename>\x1b[0m"
    );
    process.exit(1);
  }

  const inputFileName = args[0];
  try {
    // Handle file input errors
    handleFileInput(inputFileName);
    // Process file
    const cellSums = parseFile(inputFileName);
    // Print output
    printOutput(cellSums);
  } catch (error) {
    console.error("\x1b[31mError:", `${error.message}\x1b[0m`);
    process.exit(1);
  }
}

// Only run main() when not running tests
if (process.env.NODE_ENV !== "test") {
  main();
}

module.exports = { handleFileInput, printOutput, parseFile };
