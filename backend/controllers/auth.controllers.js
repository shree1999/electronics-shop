const User = require("../models/user.model.js");

/*
  porpose of having firebase auth check in our backend.
  1. Verify that the token generated is valid or not
  2. Access user information and storing that in our database. 
*/
const createOrUpdateUser = async (req, res) => {
  try {
    const { email } = req.user;

    const user = await User.findOneAndUpdate(
      { email },
      {
        name: email.split("@")[0],
      },
      {
        new: true,
      }
    );

    if (user) {
      res.send(user);
    } else {
      const newUser = new User({
        email,
        name: email.split("@")[0],
      });

      await newUser.save();
      res.send(user);
    }
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};

const getCurrentUser = async (req, res) => {
  const { email } = req.user;
  try {
    const user = await User.findOne({ email });
    res.send(user);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};

module.exports = {
  createOrUpdateUser,
  getCurrentUser,
};
