const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadImages = async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.body.image, {
      public_id: `${Date.now()}`,
      resource_type: 'auto',
    });

    res.send({
      public_image_id: result.public_id,
      url: result.secure_url,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ error: 'Something went wrong' });
  }
};

const removeImages = async (req, res) => {
  try {
    await cloudinary.uploader.destroy(req.body.public_image_id);
    res.send({ success: true });
  } catch (err) {
    console.error(err.message);
    res.status(400).send({ error: 'Something went wrong' });
  }
};

module.exports = {
  uploadImages,
  removeImages,
};
