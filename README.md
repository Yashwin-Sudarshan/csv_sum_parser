## This is a command line program which parses a spreadsheet-like CSV file and evaluates each cell by the following rules:

1. Each cell contains an array of space-separated tokens to be summed.
2. A cell can refer to another cell with the {LETTER}{NUMBER} notation (e.g. “A3”, “B1” – letters refer to columns, and numbers refer to rows).

The program will print out in CSV format, a file containing each cell with the summed value of the tokens in each cell. If a cell contains an invalid expression, then **for that cell only** the program will print #ERR.

For example, if you provide the following CSV input file:

2 3,A1,B1 B1 3<br/>
A1,D5,B2 1

The program will output:

5,5,13<br/>
5,#ERR,#ERR

## To run the program:

1. Ensure you have node downloaded and installed on your machine.
2. Ensure you are in the root of the directory and run `npm install`
3. Run the program with `node index.js <insert csv file name>`. For example. `node index.js sample.csv` or `node index.js test/test.csv` etc.
4. To run tests, run `npm test`.

For an analysis of the approach, see [analysis.md](analysis.md)
