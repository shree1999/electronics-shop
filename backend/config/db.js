const connectDatabase = async mongoose => {
  try {
    const conn = await mongoose.connect(process.env.DATABASE_URI, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });

    console.log(`Database up and running on host ${conn.connection.host}`);
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = {
  connectDatabase,
};
