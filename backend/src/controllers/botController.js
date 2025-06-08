const axios = require('axios');

const RAPIDAPI_KEY = "e4753670dfmsh208d809326ad759p1bfb46jsn513ce3a052df";
const RAPIDAPI_HOST = "chatgpt-42.p.rapidapi.com";

const getRapidAPIResponse = async (text) => {
  try {
    const response = await axios({
      method: 'POST',
      url: `https://${RAPIDAPI_HOST}/aitohuman`,
      headers: {
        'x-rapidapi-key': RAPIDAPI_KEY,
        'x-rapidapi-host': RAPIDAPI_HOST,
        'Content-Type': 'application/json'
      },
      data: { text }
    });
    return response.data;
  } catch (error) {
    console.error('RapidAPI Error:', error);
    throw error;
  }
};

exports.chat = async (req, res) => {
  try {
    const { message } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const reply = await getRapidAPIResponse(message);
    res.json({ reply });
  } catch (error) {
    console.error('Chat Error:', error);
    res.status(500).json({ error: 'Failed to get response from AI' });
  }
}; 