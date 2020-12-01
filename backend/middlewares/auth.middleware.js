const admin = require("../config/firebase.js");

const authCheck = async (req, res, next) => {
  try {
    const firebaseUser = await admin
      .auth()
      .verifyIdToken(req.headers.authtoken);

    console.log(firebaseUser);

    req.user = firebaseUser;

    next();
  } catch (err) {
    res.status(401).send({
      err: "Invalid or expired token",
    });
  }
};

module.exports = { authCheck };
