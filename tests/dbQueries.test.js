const db = require('../dbQueries');

beforeAll(done => {
  done()
})

afterAll(done => {
  // Closing the DB connection allows Jest to exit successfully.
  db.pool.end()
  done()
})

test('should successfully connect to database', (done) => {
  db.pool.query('SELECT NOW()', (err, res) => {
    expect(res).toHaveProperty('rows');
    done();
  })
})

describe('should get list of products', () => {

  test('should be an array', (done) => {
    db.listProducts(1, 5, (data) => {
      expect(Array.isArray(data)).toBe(true);
      expect(data.length).toBe(5);
      done();
    })
  })

  test('should accept count argument', (done) => {
    db.listProducts(1, 2, (data) => {
      expect(data.length).toBe(2);
      done();
    })
  })

  test('should accept page argument', (done) => {
    db.listProducts(1, 1, (data) => {
      let firstId = data[0].id;
      db.listProducts(2, 1, (data) => {
        let secondId = data[0].id;
        expect(firstId).not.toEqual(secondId);
        expect(secondId - firstId).toEqual(1);
        done();
      })
    })
  })
})

describe('should get products details', () => {

  test('should have property \"features\"', (done) => {
    db.getProductInfo(156, data => {
      expect(data).toHaveProperty('features');
      done();
    })
  }, 10000)

  test('should should have features listed as objects', (done) => {
    db.getProductInfo(23656, data => {
      expect(typeof data.features[0]).toBe('object');
      expect(typeof data.features[1]).toBe('object');
      expect(data.features[1]).toHaveProperty('feature');
      expect(data.features[1]).toHaveProperty('value');
      done();
    })
  }, 10000)
})


describe('should get products styles', () => {

  xtest('should be an object', (done) => {
    db.getProductStyles(789, data => {
      expect(typeof data).toBe('object');
      expect(Array.isArray(data)).toBe(false);
      done();
    })
  }, 10000)

  test('should store results in array \"results\"', (done) => {
    db.getProductStyles(156, data => {
      expect(Array.isArray(data.results)).toBe(true);
      expect(data.results.length).toBeGreaterThan(0);
      done();
    })
  }, 20000)

  xtest('should have several distinct styles', (done) => {
    db.getProductStyles(999, data => {
      expect(data.results[0].style_id === data.results[1].style_id).toBe(false);
      expect(data.results[1].style_id === data.results[2].style_id).toBe(false);
      done();
    })
  }, 20000)
})

describe('should get realted products', () => {

  test('should return array', (done) => {
    db.getRelatedProducts(79246, data => {
      expect(Array.isArray(data)).toBe(true);
      done();
    })
  }, 20000)

  test('should contain integers', (done) => {
    db.getRelatedProducts(687982, data => {
      expect(typeof data[0]).toBe('number');
      expect(typeof data[1]).toBe('number');
      done();
    })
  }, 20000)
})
