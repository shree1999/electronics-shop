const slugify = require('slugify');
const cloudinary = require('cloudinary').v2;

const Product = require('../models/product.model');
const { asyncHandler } = require('../middlewares/async');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

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

exports.deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug });
  if (!product) {
    return next({ message: 'Product Not Availaible', statusCode: 200 });
  }
  if (product.images.length > 0) {
    for (let i = 0; i < product.images.length; i++) {
      await cloudinary.uploader.destroy(product.images[i].public_image_id);
    }
  }

  product.remove();

  res.send({ success: true, title: product.title });
});
