const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const logger = require('morgan');

dotenv.config();

const { connectDatabase } = require('./config/db.js');
const authRoutes = require('./routes/auth.routes.js');
const categoryRoutes = require('./routes/category.routes');
const subRoutes = require('./routes/sub.routes');
const productRoutes = require('./routes/product.routes');
const imageRoutes = require('./routes/cloudinary.routes');
const { errorHander } = require('./middlewares/error.js');

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

app.use(errorHander);

app.listen(PORT, () => {
  console.log(`Server up and running on port ${PORT}`);
});
