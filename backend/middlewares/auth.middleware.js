const admin = require("../config/firebase.js");
const User = require("../models/user.model.js");

const authCheck = async (req, res, next) => {
  // middleware to check authentication
  try {
    const firebaseUser = await admin
      .auth()
      .verifyIdToken(req.headers.authtoken);

    req.user = firebaseUser;

    next();
  } catch (err) {
    res.status(401).send({
      err: "Invalid or expired token",
    });
  }
};

const adminCheck = async (req, res, next) => {
  // middleware to check whether the user is admin or not
  try {
    const { email } = req.user;
    const adminUser = await User.findOne({ email });

    if (adminUser.role !== "admin") {
      return res.status(403).send({ error: "Unauthorized access!!" });
    }

    next();
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

module.exports = { authCheck, adminCheck };
