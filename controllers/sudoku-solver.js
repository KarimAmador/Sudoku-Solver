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

    if (rowString.includes(value)) return false;
    
    return true;
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

    if (colString.includes(value)) return false;

    return true;
  }

  checkRegionPlacement(puzzleString, row, column, value) {

  }

  solve(puzzleString) {
    
  }
}

module.exports = SudokuSolver;

