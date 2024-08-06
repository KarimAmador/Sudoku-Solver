class SudokuSolver {

  /**
   * Function to validate the puzzle string.
   * @param {String} puzzleString
   */
  validate(puzzleString) {
    if (puzzleString.length != 81) return { error: 'Expected puzzle to be 81 characters long' };
    if (!puzzleString.match(/^[1-9.]+$/)) return { error: 'Invalid characters in puzzle' };
    return true;
  }

  /**
   * Function to check valid row placement for a value
   * @param {String} puzzleString 
   * @param {Number} row 
   * @param {Number} column 
   * @param {String} value 
   */
  checkRowPlacement(puzzleString, row, column, value) {
    const rowString = puzzleString.slice(row * 9, row * 9 + 9);
    console.log(rowString);

    return !rowString.includes(value);
  }

  /**
   * Function to check valid column placement for a value
   * @param {String} puzzleString 
   * @param {Number} row 
   * @param {Number} column 
   * @param {String} value 
   */
  checkColPlacement(puzzleString, row, column, value) {
    let colString = '';
    for (let i = column; i < 81; i += 9) {
      colString += puzzleString[i];
    }
    console.log(colString);

    return !colString.includes(value);
  }

  /**
   * Function to check valid region placement for a value
   * @param {String} puzzleString 
   * @param {Number} row 
   * @param {Number} column 
   * @param {String} value 
   */
  checkRegionPlacement(puzzleString, row, column, value) {
    let region = [];
    let cellIndex = column + row * 9;
    let regionIndex = (cellIndex - cellIndex % 3) - (row % 3 * 9);

    while (region.length < 9) {
      for (let i = 0; i < 3; i++) {
        region.push(puzzleString[regionIndex + i]);
      }
      regionIndex += 9;
    }
    console.log(region);

    return !region.includes(value);
  }

  solve(puzzleString) {
    
  }
}

module.exports = SudokuSolver;

