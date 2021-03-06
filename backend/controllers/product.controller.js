const slugify = require('slugify');

const Product = require('../models/product.model');
const { asyncHandler } = require('../middlewares/async');

exports.createProduct = asyncHandler(async (req, res, next) => {
  req.body.slug = slugify(req.body.title, { lower: true });
  const product = new Product(req.body);
  await product.save();
  res.status(201).send(product);
});

exports.getAllProducts = asyncHandler(async (req, res, next) => {
  const products = await Product.find().lean().exec();
  if (products.length === 0) {
    return next({ message: 'No products found', statusCode: 200 });
  }
  res.send(products);
});
