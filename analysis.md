The implementation was written using JavaScript, and tested with the Jest framework.

The following assumptions were made prior to developing the solution:
- We can use lowercase or uppercase letters to represent columns.
- A cell reference can only refer to a cell prior to it, not after it in the file.
- There can be negative numbers.
- Leading and trailing whitespace in cells can be trimmed.
- After the column 'Z' there are not extra columns such as 'AA', 'AB', 'AC' etc.
- Assume blank cells trigger an '#ERR' input and not 0.


The approach was to visit every 'cell' in the file, do the computation of the sums of the
tokens or mark it as "#ERR", and store the coordinate of the cell and the sum or "#ERR"
value in a map. The use of a map to store previously visited cells enabled the program to
fetch the sum or "#ERR" value of a cell that is being referred to by another cell after it.
Previously, the idea was once the program encounters a cell reference, it would iterate
over the lines from the start of the file until it found the cell being referred to, but the use
of a map to store visited cells and their values significantly saves execution time. Once
the entire file has been parsed, then a function will print out the values in the map to the
console.


A highlight of the implementation is that it works on a range of valid and invalid token
inputs. An obvious limitation is the time complexity, which can be simplified to O(l * c * t),
where l is the number of lines in the file, c is number of cells in a line, and t is the number
of tokens per cell. The execution time will increase sizeably as the file content increases.
