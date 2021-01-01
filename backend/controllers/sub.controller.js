const slugify = require("slugify");

const Sub = require("../models/subcategory.model");

/*
  @route   GET /api/subs 
  @access  public/private
  @desc    allow users to get all sub categories
*/
exports.getAllSubCategories = async (req, res) => {
  try {
    const subs = await Sub.find().sort({ createdAt: -1 });
    if (!subs) {
      return res.status(400).send({ error: "No sub-categories found" });
    }
    return res.status(200).send(subs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ error: "Server Error" });
  }
};

/*
  @route  GET /api/subs/:slug
  @access public/private
  @desc   allow users to get a specific sub category
*/
exports.getSingleSubCategory = async (req, res) => {
  try {
    const sub = await Sub.findOne({ slug: req.params.slug });
    if (!sub) {
      return res.status(400).send({ error: "Sub Category not found" });
    }
    res.send(sub);
  } catch (err) {
    console.error(err.message);
    res.status({ error: "Server Error" });
  }
};

/*
  @route  GET /api/subs/:id
  @access public/private
  @desc   allow users to get all sub categories of one main category
*/
exports.getAllSubs = async (req, res) => {
  try {
    const subs = await Sub.find({ parent: req.params.id }).sort({
      createdAt: -1,
    });
    if (!subs) {
      return res.status(400).send({ error: "No sub-categories found" });
    }
    return res.status(200).send(subs);
  } catch (err) {
    console.error(err.message);
    res.status({ error: "Server Error" });
  }
};

/*
  @route  POST /api/subs/:id
  @access admin
  @desc   allow admin to create sub categories for a main categories
*/
exports.createSubCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const slug = slugify(name, { lower: true });

    const sub = new Sub({ name, slug, parent: req.params.id });
    await sub.save();
    res.send(sub);
  } catch (err) {
    if (err.code === 11000) {
      return res
        .status(400)
        .send({ error: "This Subcategory already exisits" });
    }
    res.status(400).send({ error: err.message });
  }
};

/*
  @route  DELETE /api/subs/:slug
  @access admin
  @desc   allow admin to delete this sub category
*/
exports.deleteSubCategory = async (req, res) => {
  try {
    const sub = await Sub.findOne({ slug: req.params.slug });
    if (!sub) {
      return res.status(400).send({ error: "Sub Category not found" });
    }
    sub.remove();
    res.send(sub);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};
