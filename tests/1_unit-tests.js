const chai = require('chai');
const assert = chai.assert;

const Solver = require('../controllers/sudoku-solver.js');
const puzzleStrings = require('../controllers/puzzle-strings.js').puzzlesAndSolutions;
let solver = new Solver();

suite('Unit Tests', () => {
    test('Logic handles a valid puzzle string of 81 characters', () => {
        assert.isOk(solver.validate(puzzleStrings[0][0]));
    })
    test('Logic handles a puzzle string with invalid characters (not 1-9 or .)', () => {
        assert.deepEqual(solver.validate('A,5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.'), { error: 'Invalid characters in puzzle' });
    })
    test('Logic handles a puzzle string that is not 81 characters in length', () => {
        assert.deepEqual(solver.validate(puzzleStrings[0][0].slice(0, 80)), { error: 'Expected puzzle to be 81 characters long' })
    })
    test('Logic handles a valid row placement', () => {
        assert.isOk(solver.checkRowPlacement(puzzleStrings[0][0], 0, 1, '7'));
    })
    test('Logic handles an invalid row placement', () => {
        assert.isNotOk(solver.checkRowPlacement(puzzleStrings[0][0], 0, 1, '8'));
    })
    test('Logic handles a valid column placement', () => {
        assert.isOk(solver.checkColPlacement(puzzleStrings[0][0], 1, 0, '5'));
    })
    test('Logic handles an invalid column placement', () => {
        assert.isNotOk(solver.checkColPlacement(puzzleStrings[0][0], 1, 0, '8'));
    })
    test('Logic handles a valid region (3x3 grid) placement', () => {
        assert.isOk(solver.checkRegionPlacement(puzzleStrings[0][0], 1, 1, '8'));
    })
    test('Logic handles an invalid region (3x3 grid) placement', () => {
        assert.isNotOk(solver.checkRegionPlacement(puzzleStrings[0][0], 1, 1, '6'));
    })
    test('Valid puzzle strings pass the solver', () => {
        assert.property(solver.solve(puzzleStrings[0][0]), 'solution');
    })
    test('Invalid puzzle strings fail the solver', () => {
        assert.property(solver.solve('7' + puzzleStrings[0][0].slice(1)), 'error');
    })
    test('Solver returns the expected solution for an incomplete puzzle', () => {
        assert.equal(solver.solve(puzzleStrings[0][0]).solution, puzzleStrings[0][1]);
        assert.equal(solver.solve(puzzleStrings[1][0]).solution, puzzleStrings[1][1]);
        assert.equal(solver.solve(puzzleStrings[2][0]).solution, puzzleStrings[2][1]);
        assert.equal(solver.solve(puzzleStrings[3][0]).solution, puzzleStrings[3][1]);
        assert.equal(solver.solve(puzzleStrings[4][0]).solution, puzzleStrings[4][1]);
    })
});
