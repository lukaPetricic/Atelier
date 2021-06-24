const { Pool } = require('pg')

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'products',
  password: '0000'
})

function listProducts(page, count, cb) {
  let start = page * count - count;
  pool.query(`SELECT * FROM product LIMIT ${count} OFFSET ${start}`, (err, res) => {
    if (err) console.error(err);
    cb(res.rows);
  })
}

function getProductInfo(productId, cb) {
  pool.query(`SELECT p.*, array(select row_to_json(row) from (select features.feature, features.value FROM features WHERE features.product_id=${productId}) row) AS features FROM product AS p WHERE p.id = ${productId}`, (err, res) => {
    if (err) console.error(err);
    cb(res.rows[0]);
  })
}



module.exports = {
  listProducts,
  getProductInfo
}

//`SELECT * FROM product WHERE id = ${productId}`
//`SELECT p.*, f.feature, f.value FROM product AS p JOIN features  AS f ON f.product_id = p.id WHERE p.id = ${productId}`
//
//
