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
  pool.query(`SELECT p.*, array(select row_to_json(row) from
  (select f.feature, f.value FROM features  f WHERE f.product_id=${productId}) row) AS features
   FROM product p WHERE p.id = ${productId}`, (err, res) => {
    if (err) console.error(err);
    cb(res.rows[0]);
  })
}

function getProductStyles(productId, cb) {
  pool.query(
    `SELECT st.id AS style_id,
    st.name, st.original AS original_price,
    st.sale_price, st.default_style as "default?",
    array(select row_to_json(row) FROM
    (select p.url, p.thumbnail_url FROM photos p WHERE p.style_id=st.id) row) AS photos
    FROM styles st
    WHERE st.product_id=${productId}`, (err, res) => {
    if (err) console.error(err);
    let styles = res.rows;
    // let numOfStyles = res.rows.length;
    // let firstStyleId = res.rows[0].style_id;

    let promises = [];

    styles.forEach(style => {
      promises.push(new Promise(resolve => {

        let styleId = style.style_id;

        pool.query(
          `SELECT
        json_build_object (
            sk.id, json_build_object (
              'quantity', sk.quantity,
              'size', sk.size
            )
         )
        FROM skus sk WHERE sk.style_id = ${styleId}`, (err, res) => {
          if (err) console.error(err);
          let skus = {};

          res.rows.forEach(obj => {
            let skuId = Object.keys(obj.json_build_object)[0]
            skus[skuId] = obj.json_build_object[skuId];
          })

          style['default?'] = Boolean(style['default?']);
          style.skus = skus;
          resolve(true)
        })
      }));
    });

    Promise.all(promises).then(() => {
      let result = {
        product_id: productId,
        results: styles
      }
      cb(result)
    })
  })
}

function getRelatedProducts(productId, cb) {
  pool.query(`SELECT related_product_id FROM related r WHERE r.current_product_id = ${productId}`, (err, res) => {
    if (err) console.error(err);
    let related = [];
    res.rows.forEach(obj => {
      related.push(Object.values(obj)[0]);
    })
    cb(related);
  })
}



module.exports = {
  listProducts,
  getProductInfo,
  getProductStyles,
  getRelatedProducts,
  pool
}

// "    LEFT JOIN skus sk ON sk.style_id = st.id
// "original_price": st.original,
// "sale_price": st.sale_price,
// "default?": st.default_style

// `SELECT st.id AS style_id,
//     st.name, st.original AS original_price,
//     st.sale_price, st.default_style as "default?",
//     array(select row_to_json(row) FROM
//     (select p.url, p.thumbnail_url FROM photos p WHERE p.style_id=st.id) row) AS photos,
//     (select row_to_json(row) FROM
//     (select sk.quantity, sk.size FROM skus sk WHERE sk.style_id=st.id) row) AS skus
//     FROM styles st WHERE st.product_id=${productId}`

// json_build_object(
//   "id", json_build_object(
//     "name", st.name
//     )
//   )

// `SELECT st.id AS style_id,
//     st.name, st.original AS original_price,
//     st.sale_price, st.default_style as "default?",
//     array(select row_to_json(row) FROM
//     (select p.url, p.thumbnail_url FROM photos p WHERE p.style_id=st.id) row) AS photos,

// SELECT
//       json_build_object (
//         'style_id', st.id,
//         'name', st.name,
//         'original_price', st.original,
//         'sale_price', st.sale_price,
//         'default?', st.default_style,