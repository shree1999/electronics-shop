const admin = require('firebase-admin');

const serviceAccount = require('./googleConfig.json');
const { keys } = require('./keys');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: keys.DATABASE_URL,
});

module.exports = admin;
