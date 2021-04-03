const slugify = require('slugify');
const cloudinary = require('cloudinary').v2;

const Product = require('../models/product.model');
const User = require('../models/user.model');
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

exports.getSingleProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findOne({ slug: req.params.slug })
    .populate('subs')
    .populate('category')
    .exec();
  if (!product) {
    return next({ message: 'Product Not Available', statusCode: 200 });
  }

  res.send(product);
});

exports.updateProduct = async (req, res) => {
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const updated = await Product.findOneAndUpdate(
      { slug: req.params.slug },
      req.body,
      { new: true }
    ).exec();
    res.send(updated);
  } catch (err) {
    console.log('PRODUCT UPDATE ERROR ----> ', err);
    // return res.status(400).send("Product update failed");
    res.status(400).json({
      error: err.message,
    });
  }
};
// with pagination
exports.listProducts = async (req, res) => {
  try {
    //      sort               order     page
    // createdAt/updatedAt,   desc/asc,   3
    const { sort, order, page } = req.body;

    const currentPage = page || 1;
    const perPage = 3;
    const products = await Product.find({})
      .skip((currentPage - 1) * perPage)
      .populate('category')
      .populate('subs')
      .sort([[sort, order]])
      .limit(perPage)
      .exec();

    res.json(products);
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: 'Something Went Wrong' });
  }
};

exports.productsCount = async (req, res) => {
  let total = await Product.find({}).estimatedDocumentCount().exec();
  res.send({ total });
};

exports.productStarRating = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).exec();
    const user = await User.findOne({ email: req.user.email });
    const { star } = req.body;

    // who is updating?
    // check if currently logged in user have already added rating to this product?
    let existingRatingObject = product.ratings.find(
      ele => ele.postedBy.toString() === user._id.toString()
    );

    // if user haven't left rating yet, push it
    if (existingRatingObject === undefined) {
      let ratingAdded = await Product.findByIdAndUpdate(
        product._id,
        {
          $push: { ratings: { star, postedBy: user._id } },
        },
        { new: true }
      ).exec();
      console.log('ratingAdded', ratingAdded);
      res.json(ratingAdded);
    } else {
      // if user have already left rating, update it
      const ratingUpdated = await Product.updateOne(
        {
          ratings: { $elemMatch: existingRatingObject },
        },
        { $set: { 'ratings.$.star': star } },
        { new: true }
      ).exec();
      console.log('ratingUpdated', ratingUpdated);
      res.json(ratingUpdated);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ error: 'Something Went Wrong' });
  }
};

// Filter and Search
const handleQuery = async (req, res, query) => {
  const products = await Product.find({ $text: { $search: query } })
    .populate('category', '_id name')
    .populate('subs', '_id name')
    .populate('postedBy', '_id name')
    .exec();

  return res.send(products);
};

const handlePrice = async (req, res, price) => {
  try {
    const products = await Product.find({
      price: {
        $gte: price[0],
        $lte: price[1],
      },
    })
      .populate('category', '_id name')
      .populate('subs', '_id name')
      .populate('postedBy', '_id name')
      .exec();
    return res.send(products);
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: 'Something went wrong' });
  }
};

const handleCategory = async (req, res, category) => {
  try {
    let products = await Product.find({ category })
      .populate('category', '_id name')
      .populate('subs', '_id name')
      .populate('postedBy', '_id name')
      .exec();

    return res.send(products);
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: 'Something went wrong' });
  }
};

const handleStarRating = (req, res, stars) => {
  Product.aggregate([
    {
      $project: {
        document: '$$ROOT', // loads entire model for aggregation
        floorAverage: {
          $floor: { $avg: '$ratings.star' },
        },
      },
    },
    { $match: { floorAverage: stars } },
  ])
    .limit(12)
    .exec((err, aggregates) => {
      if (err) console.log('AGGREGATE ERROR', err);
      Product.find({ _id: aggregates })
        .populate('category', '_id name')
        .populate('subs', '_id name')
        .populate('postedBy', '_id name')
        .exec((err, products) => {
          if (err) console.log('PRODUCT AGGREGATE ERROR', err);
          return res.send(products);
        });
    });
};

const handleSubsFilter = async (req, res, sub) => {
  try {
    const products = await Product.find({ subs: sub })
      .populate('category', '_id name')
      .populate('subs', '_id name')
      .populate('postedBy', '_id name')
      .exec();

    return res.send(products);
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: 'Something went wrong' });
  }
};
const handleColorFilter = async (req, res, color) => {
  try {
    const products = await Product.find({ color })
      .populate('category', '_id name')
      .populate('subs', '_id name')
      .populate('postedBy', '_id name')
      .exec();

    return res.send(products);
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: 'Something went wrong' });
  }
};
const handleBrandFilter = async (req, res, brand) => {
  try {
    const products = await Product.find({ brand })
      .populate('category', '_id name')
      .populate('subs', '_id name')
      .populate('postedBy', '_id name')
      .exec();
    return res.send(products);
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: 'Something went wrong' });
  }
};

// Without Pagination
const listProducts = async (req, res) => {
  try {
    //      sort               order    limit
    // createdAt/updatedAt,   desc/asc,   3
    const products = await Product.find({})
      .populate('category', '_id name')
      .populate('subs', '_id name')
      .populate('postedBy', '_id, name')
      .limit(12)
      .exec();

    return res.send(products);
  } catch (err) {
    console.log(err);
  }
};

exports.searchFilters = async (req, res) => {
  const { query, price, category, stars, subs, color, brand } = req.body;

  if (query) {
    console.log('query', query);
    await handleQuery(req, res, query);
  }
  if (price !== undefined) {
    console.log('price ---> ', price);
    await handlePrice(req, res, price);
  }
  if (category && category.length > 0) {
    console.log('category ---> ', category);
    await handleCategory(req, res, category);
  }
  if (stars) {
    console.log('Stars ---> ', stars);
    handleStarRating(req, res, stars);
  }
  if (subs) {
    console.log('subs --->', subs);
    await handleSubsFilter(req, res, subs);
  }
  if (color) {
    console.log('color --->', color);
    await handleColorFilter(req, res, color);
  }
  if (brand) {
    console.log('brand --->', brand);
    await handleBrandFilter(req, res, brand);
  }

  await listProducts(req, res);
};
