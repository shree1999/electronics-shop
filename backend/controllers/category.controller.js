const slugify = require('slugify');

const Category = require('../models/category.model');
const Sub = require('../models/subcategory.model');
const Product = require('../models/product.model');

/*
  @route -> POST /api/category, 
  @desc  -> create category
  @creator -> admin
*/
const createCategory = async (req, res) => {
  try {
    const category = new Category({
      name: req.body.name,
      slug: slugify(req.body.name, { lower: true }),
    });

    await category.save();

    res.send(category);
  } catch (err) {
    console.error(err.message);
    if (err.code === 11000) {
      return res.status(400).send({ error: 'This category already exists' });
    }

    res.status(400).send({ error: 'Create category failed' });
  }
};

/*
  @route -> GET /api/category
  @desc  -> get all categories
*/
const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 }).exec();

    if (!categories) {
      return res.status(400).send({ error: 'No categories created' });
    }
    res.send(categories);
  } catch (err) {
    res.status(400).send({ error: 'Something went wrong' });
  }
};

/*
  @route -> GET /api/category/:slug
  @desc  -> get a single category using slug
*/
const readCategory = async (req, res) => {
  try {
    const category = await Category.findOne({
      slug: req.params.slug,
    }).exec();

    if (!category) {
      return res.status(400).send({ error: 'Category not found' });
    }

    const products = await Product.find({ category })
      .populate('category')
      .exec();

    res.send({ category, products });
  } catch (err) {
    console.error(err.message);
    res.status(400).send({ error: 'Something went wrong' });
  }
};

/*
  @route -> PUT /api/category/:slug
  @desc  -> update a single category using slug
  @access -> admin
*/
const updateCategory = async (req, res) => {
  console.log(req.params.slug, req.body.name);
  try {
    const category = await Category.findOneAndUpdate(
      { slug: req.params.slug },
      {
        name: req.body.name,
        slug: slugify(req.body.name, { lower: true }),
      },
      {
        new: true,
      }
    );
    if (!category) {
      return res.status(400).send({ error: 'Category not found' });
    }
    res.send(category);
  } catch (err) {
    console.error(err.message);
    res.status(400).send({ error: 'Something went wrong' });
  }
};

/*
  @route -> DELETE /api/category/:slug
  @desc  -> delete a single category using slug
  @access -> admin
*/
const removeCategory = async (req, res) => {
  try {
    const category = await Category.findOne({
      slug: req.params.slug,
    }).exec();

    if (!category) {
      return res.status(400).send({ error: 'Category not found' });
    }

    category.remove();

    await Sub.deleteMany({ parent: category._id });

    res.send(category);
  } catch (err) {
    console.error(err.message);
    res.status(400).send({ error: 'Something went wrong' });
  }
};

const getAllSubsOfCategory = async (req, res) => {
  try {
    console.log(req.params.id);
    const subs = await Sub.find({ parent: req.params.id });
    if (subs.length === 0) {
      return res.status(400).send({ error: 'Not Found' });
    }
    res.send(subs);
  } catch (err) {
    res.status(500).send({ error: 'Something went wrong' });
  }
};

module.exports = {
  createCategory,
  readCategory,
  updateCategory,
  removeCategory,
  getAllCategories,
  getAllSubsOfCategory,
};
