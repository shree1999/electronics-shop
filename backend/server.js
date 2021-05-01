const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const logger = require('morgan');

dotenv.config();

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
const { errorHander } = require('./middlewares/error');

connectDatabase(mongoose); // database connection

const app = express();
const PORT = process.env.PORT || 8000;

// required middlewares
app.use(cors());
app.use(helmet());
app.use(logger('dev'));
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true }));

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

app.use(errorHander);

app.listen(PORT, () => {
  console.log(`Server up and running on port ${PORT}`);
});
