const slugify = require('slugify');

const Product = require('../models/product.model');
const { asyncHandler } = require('../middlewares/async');

exports.createProduct = asyncHandler(async (req, res, next) => {
  console.log(req.body);

  req.body.slug = slugify(req.body.title, { lower: true });
  const product = new Product(req.body);
  await product.save();
  res.status(201).send(product);
});
