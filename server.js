const express = require('express')
const db = require('./dbQueries')
const app = express()
const port = 3000

app.use(express.json());
app.use(express.urlencoded());

app.get('/products', (req, res) => {
  let page = Number(req.query.page) || 1;
  let count = Number(req.query.count) || 5;
  db.listProducts(page, count, (result) => res.send(result))
})

app.get('/products/:productId', (req, res) => {
  let productId = req.params.productId;

  if (productId <= 0 || isNaN(Number(productId))) {
    res.status(400).send('Malformed request syntax');
  } else {
    db.getProductInfo(productId, (result) => res.send(result))
  }
})

app.get('/products/:productId/styles', (req, res) => {
  let productId = req.params.productId;

  if (productId <= 0 || isNaN(Number(productId))) {
    res.status(400).send('Malformed request syntax');
  } else {
    db.getProductStyles(productId, (result) => res.send(result))
  }
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})