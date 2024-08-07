'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {
  
  let solver = new SudokuSolver();

  app.route('/api/check')
    .post((req, res) => {
      const puzzle = req.body.puzzle;
      const value = req.body.value;

      if (!req.body.coordinate || !puzzle || !value) return res.json({ error: 'Required field(s) missing' });
      
      let validation = solver.validate(puzzle);
      if (validation.error) return res.json(validation);
      
      let solveTest = solver.solve(puzzle);
      if (solveTest.error) return res.json(solveTest);

      if (!value.match(/^[1-9]$/)) return res.json({ error: 'Invalid value' });
      
      const coordinate = [req.body.coordinate[0].toUpperCase().charCodeAt(0) - 65, Number(req.body.coordinate.slice(1)) - 1];
      if (coordinate[0] > 8 || coordinate[0] < 0 || coordinate[1] > 8 || coordinate[1] < 0 || isNaN(coordinate[1])) return res.json({ error: 'Invalid coordinate' });
      
      let result = { valid: true };

      if (!solver.checkRowPlacement(puzzle, coordinate[0], coordinate[1], value)) result.conflict = ['row'];
      if (!solver.checkColPlacement(puzzle, coordinate[0], coordinate[1], value)) result.conflict ? result.conflict.push('column') : result.conflict = ['col'];
      if (!solver.checkRegionPlacement(puzzle, coordinate[0], coordinate[1], value)) result.conflict ? result.conflict.push('region') : result.conflict = ['region'];

      if (result.conflict) result.valid = false;

      res.json(result);
    });
    
  app.route('/api/solve')
    .post((req, res) => {
      if (!req.body.puzzle) return res.json({ error: 'Required field missing' });

      const result = solver.solve(req.body.puzzle);

      if (result.error) return res.json(result);
      
      res.json(result);
    });
};
