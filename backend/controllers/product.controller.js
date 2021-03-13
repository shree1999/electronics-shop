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
  const products = await Product.find({})
    .limit(parseInt(req.params.limit))
    .populate('category')
    .populate('subs')
    .sort({ createdAt: -1 })
    .exec();

  res.send(products);
});
