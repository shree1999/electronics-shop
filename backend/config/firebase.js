const admin = require("firebase-admin");
const serviceAccount = require("./googleConfig.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://e-commerce-dad49.firebaseio.com",
});

module.exports = admin;
