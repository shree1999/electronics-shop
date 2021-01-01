const mongoose = require("mongoose");

const subSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: "Name is required",
      minlength: [2, "Name must be atleast 2 digits long"],
      maxlength: [40, "Name must be atmost 40 characters long"],
    },

    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },

    parent: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Category",
    },
  },
  { timestamps: true }
);

const Sub = mongoose.model("Sub", subSchema);

module.exports = Sub;
