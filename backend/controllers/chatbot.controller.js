const axios = require('axios');

exports.chatSearchQuery = async (req, res) => {
  const { search_query } = req.body;

  try {
    const { data } = await axios.post('http://localhost:8000/', {
      search_query,
    });

    res.send({ success: true, data });
  } catch (err) {
    console.error(err.message);
  }
};
