const axios = require('axios');

exports.chatSearchQuery = async (req, res) => {
  const { search_query, labels } = req.body;

  try {
    const { data } = await axios.post('http://localhost:8000/', {
      search_query,
      labels,
    });

    res.send({ success: true, data });
  } catch (err) {
    console.error(err.message);
  }
};
