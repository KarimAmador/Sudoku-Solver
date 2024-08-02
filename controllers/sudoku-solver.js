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
    const rowString = puzzleString.slice((row - 1) * 9, (row - 1) * 9 + 9);
    console.log(rowString);

    if (rowString.includes(value)) return false;
    
    return true;
  }

  checkColPlacement(puzzleString, row, column, value) {

  }

  checkRegionPlacement(puzzleString, row, column, value) {

  }

  solve(puzzleString) {
    
  }
}

module.exports = SudokuSolver;

