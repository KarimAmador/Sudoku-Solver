const chai = require("chai");
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server');

const puzzleStrings = require('../controllers/puzzle-strings.js').puzzlesAndSolutions;

chai.use(chaiHttp);

suite('Functional Tests', () => {
  test('Solve a puzzle with valid puzzle string: POST request to /api/solve', (done) => {
    chai
      .request(server)
      .keepOpen()
      .post('/api/solve')
      .send({ puzzle: puzzleStrings[0][0] })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.body.solution, puzzleStrings[0][1]);
        done();
      })
  })
  test('Solve a puzzle with missing puzzle string: POST request to /api/solve', (done) => {
    chai
      .request(server)
      .keepOpen()
      .post('/api/solve')
      .send({ puzzle: '' })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.deepEqual(res.body, { error: 'Required field missing' });
        done();
      })
  })
  test('Solve a puzzle with invalid characters: POST request to /api/solve', (done) => {
    chai
      .request(server)
      .keepOpen()
      .post('/api/solve')
      .send({ puzzle: 'A' + puzzleStrings[0][0].slice(1) })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.deepEqual(res.body, { error: 'Invalid characters in puzzle' });
        done();
      })
  })
  test('Solve a puzzle with incorrect length: POST request to /api/solve', (done) => {
    chai
      .request(server)
      .keepOpen()
      .post('/api/solve')
      .send({ puzzle: puzzleStrings[0][0].slice(1) })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.deepEqual(res.body, { error: 'Expected puzzle to be 81 characters long' });
        done();
      })
  })
  test('Solve a puzzle that cannot be solved: POST request to /api/solve', (done) => {
    chai
      .request(server)
      .keepOpen()
      .post('/api/solve')
      .send({ puzzle: '7' + puzzleStrings[0][0].slice(1) })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.deepEqual(res.body, { error: 'Puzzle cannot be solved' });
        done();
      })
  })
  test('Check a puzzle placement with all fields: POST request to /api/check', (done) => {
    chai
      .request(server)
      .keepOpen()
      .post('/api/check')
      .send({ puzzle: puzzleStrings[0][0], coordinate: 'A2', value: '3' })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.isOk(res.body.valid);
        done();
      })
  })
  test('Check a puzzle placement with single placement conflict: POST request to /api/check', (done) => {
    chai
      .request(server)
      .keepOpen()
      .post('/api/check')
      .send({ puzzle: puzzleStrings[0][0], coordinate: 'A2', value: '4' })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.deepEqual(res.body, { valid: false, conflict: ['row'] });
        done();
      })
  })
  test('Check a puzzle placement with multiple placement conflicts: POST request to /api/check', (done) => {
    chai
      .request(server)
      .keepOpen()
      .post('/api/check')
      .send({ puzzle: puzzleStrings[0][0], coordinate: 'A2', value: '5' })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.deepEqual(res.body, { valid: false, conflict: ['row', 'region'] });
        done();
      })
    })
  test('Check a puzzle placement with all placement conflicts: POST request to /api/check', (done) => {
    chai
      .request(server)
      .keepOpen()
      .post('/api/check')
      .send({ puzzle: puzzleStrings[0][0], coordinate: 'A2', value: '2' })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.deepEqual(res.body, { valid: false, conflict: ['row', 'column', 'region'] });
        done();
      })
  })
  test('Check a puzzle placement with missing required fields: POST request to /api/check', (done) => {
    chai
      .request(server)
      .keepOpen()
      .post('/api/check')
      .send({ puzzle: puzzleStrings[0][0], coordinate: '', value: '' })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.deepEqual(res.body, { error: 'Required field(s) missing' });
        done();
      })
  })
  test('Check a puzzle placement with invalid characters: POST request to /api/check', (done) => {
    chai
      .request(server)
      .keepOpen()
      .post('/api/check')
      .send({ puzzle: 'A' + puzzleStrings[0][0].slice(1), coordinate: 'A2', value: '3' })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.deepEqual(res.body, { error: 'Invalid characters in puzzle' });
        done();
      })
  })
  test('Check a puzzle placement with incorrect length: POST request to /api/check', (done) => {
    chai
      .request(server)
      .keepOpen()
      .post('/api/check')
      .send({ puzzle: puzzleStrings[0][0].slice(1), coordinate: 'A2', value: '3' })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.deepEqual(res.body, { error: 'Expected puzzle to be 81 characters long' });
        done();
      })
  })
  test('Check a puzzle placement with invalid placement coordinate: POST request to /api/check', (done) => {
    chai
      .request(server)
      .keepOpen()
      .post('/api/check')
      .send({ puzzle: puzzleStrings[0][0], coordinate: 'A0', value: '1' })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.deepEqual(res.body, { error: 'Invalid coordinate' });
        done();
      })
  })
  test('Check a puzzle placement with invalid placement value: POST request to /api/check', (done) => {
    chai
      .request(server)
      .keepOpen()
      .post('/api/check')
      .send({ puzzle: puzzleStrings[0][0], coordinate: 'A2', value: '10' })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.deepEqual(res.body, { error: 'Invalid value' });
        done();
      })
  })
});

