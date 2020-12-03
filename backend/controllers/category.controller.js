const slugify = require("slugify");

const Category = require("../models/category.model");

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
      return res.status(400).send("This category already exists");
    }

    res.status(400).send({ error: "Create category failed" });
  }
};

/*
  @route -> GET /api/categories
  @desc  -> get all categories
*/
const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 }).exec();

    if (!categories) {
      return res.status(204).send({ msg: "No categories created" });
    }
    res.send(categories);
  } catch (err) {
    console.error(err.message);
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
      return res.status(400).send({ error: "Category not found" });
    }

    res.send(category);
  } catch (err) {
    console.error(err.message);
    res.status(400).send({ error: "Something went wrong" });
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
      return res.status(400).send({ error: "Category not found" });
    }
    res.send(category);
  } catch (err) {
    console.error(err.message);
    res.status(400).send({ error: "Something went wrong" });
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
      return res.status(400).send({ error: "Category not found" });
    }

    category.remove();

    res.send(category);
  } catch (err) {
    console.error(err.message);
    res.status(400).send({ error: "Something went wrong" });
  }
};

module.exports = {
  createCategory,
  readCategory,
  updateCategory,
  removeCategory,
  getAllCategories,
};
