const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const helmet = require('helmet');
const logger = require('morgan');
const path = require('path');
const mongoSantize = require('express-mongo-sanitize');

const { connectDatabase } = require('./config/db');
const authRoutes = require('./routes/auth.routes');
const categoryRoutes = require('./routes/category.routes');
const subRoutes = require('./routes/sub.routes');
const productRoutes = require('./routes/product.routes');
const imageRoutes = require('./routes/cloudinary.routes');
const userRoutes = require('./routes/user.routes');
const coupenRoutes = require('./routes/coupen.routes');
const paymentRoutes = require('./routes/payment');
const adminRoutes = require('./routes/admin.routes');
const chatSearchRoutes = require('./routes/chatbot.routes');
const { errorHander } = require('./middlewares/error');

if (
  process.env.NODE_ENV === 'development' ||
  process.env.NODE_ENV === 'production'
) {
  connectDatabase(mongoose);
}

const app = express();

// required middlewares
app.use(cors());
app.use(helmet({ contentSecurityPolicy: false }));
app.use(logger('dev'));
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(mongoSantize());

// routes
app.use('/api/auth', authRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/subs', subRoutes);
app.use('/api/products', productRoutes);
app.use('/api/images', imageRoutes);
app.use('/api/users', userRoutes);
app.use('/api/coupens', coupenRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/search', chatSearchRoutes);

app.use(errorHander);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client', 'build', 'index.html'));
  });
} else {
  app.get('/', (req, res) => {
    res.send('API is running....');
  });
}

module.exports = app;
