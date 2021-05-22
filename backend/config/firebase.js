const admin = require('firebase-admin');

const serviceAccount = require('./googleConfig.js');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DATABASE_URL,
});

module.exports = admin;
