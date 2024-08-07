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

    return !rowString.includes(value) || puzzleString[column + row * 9] === value;
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

    return !colString.includes(value) || puzzleString[column + row * 9] === value;
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

    return !region.includes(value) || puzzleString[cellIndex] === value;
  }

  /**
   * Function to check valid placement for a value
   * @param {String} puzzleString 
   * @param {Number} nextEmpty 
   * @param {String} value 
   * @returns {Boolean}
   */
  checkValidPlacement(puzzleString, emptyCell, value) {
    const row = Math.floor(emptyCell / 9);
    const col = emptyCell % 9;

    return ([
      this.checkRowPlacement(puzzleString, row, col, value),
      this.checkColPlacement(puzzleString, row, col, value),
      this.checkRegionPlacement(puzzleString, row, col, value)
    ].every((item) => item));
  }

  /**
   * Function to solve a sudoku
   * @param {String} puzzleString 
   */
  solve(puzzleString) {
    let validation = this.validate(puzzleString);
    if (validation !== true) return validation;

    let puzzle = puzzleString.split('');

    return this._solve(puzzle) ? { solution: puzzle.join('') } : { error: 'Puzzle cannot be solved' };
  }

  _solve(puzzle) {
    let nextEmpty = puzzle.findIndex((item) => item === '.');

    if (nextEmpty === -1) return true;

    for (let value = 1; value < 10; value++) {
      if (this.checkValidPlacement(puzzle.join(''), nextEmpty, `${value}`)) {
        puzzle[nextEmpty] = `${value}`;
        if (this._solve(puzzle)) {
          return true;
        }

        puzzle[nextEmpty] = '.';
      }
    }
    return false;
  }
}

module.exports = SudokuSolver;

