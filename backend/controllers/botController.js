const axios = require('axios');

const RAPIDAPI_KEY = "8c1d8bb6cemsh090bf3672d7c0adp1e4bb1jsnbe93dd4656c7";

const getChatGPTResponse = async (message, category) => {
  try {
    const url = "https://chatgpt-42.p.rapidapi.com/gpt4";
    const payload = {
      messages: [
        {
          role: "system",
          content: `You are an AI assistant specialized in helping ${category}. Provide relevant and helpful responses based on this context.`
        },
        {
          role: "user",
          content: message
        }
      ],
      web_access: false
    };
    
    const headers = {
      "x-rapidapi-key": RAPIDAPI_KEY,
      "x-rapidapi-host": "chatgpt-42.p.rapidapi.com",
      "Content-Type": "application/json"
    };

    console.log("Sending request to ChatGPT API...");
    const response = await axios.post(url, payload, { 
      headers, 
      timeout: 30000
    });
    
    console.log("Status Code:", response.status);
    console.log("Response:", response.data);

    if (response.status === 200) {
      const data = response.data;
      if (data && data.result) {
        return data.result;
      }
    }
    return null;
  } catch (error) {
    console.error("Main API Error:", error.message);
    return null;
  }
};

const tryAlternativeChatGPTAPI = async (message, category) => {
  try {
    const url = "https://chatgpt-42.p.rapidapi.com/gpt3";
    const payload = {
      messages: [
        {
          role: "system",
          content: `You are an AI assistant specialized in helping ${category}. Provide relevant and helpful responses based on this context.`
        },
        {
          role: "user",
          content: message
        }
      ],
      web_access: false
    };
    
    const headers = {
      "x-rapidapi-key": RAPIDAPI_KEY,
      "x-rapidapi-host": "chatgpt-42.p.rapidapi.com",
      "Content-Type": "application/json"
    };

    const response = await axios.post(url, payload, { 
      headers, 
      timeout: 20000
    });
    
    if (response.status === 200 && response.data && response.data.result) {
      return response.data.result;
    }
    return null;
  } catch (error) {
    console.error("Alternative API Error:", error.message);
    return null;
  }
};

exports.chat = async (req, res) => {
  try {
    const { message, category } = req.body;
    
    if (!message || !message.trim()) {
      return res.status(400).json({ error: "No message provided" });
    }

    if (!category) {
      return res.status(400).json({ error: "Category is required" });
    }

    console.log("User message:", message);
    console.log("Category:", category);

    // Try main API first
    let reply = await getChatGPTResponse(message, category);
    
    // If main API fails, try alternative
    if (!reply) {
      console.log("Main API failed, trying alternative...");
      reply = await tryAlternativeChatGPTAPI(message, category);
    }
    
    // If all APIs fail
    if (!reply) {
      return res.status(503).json({ 
        error: "ChatGPT service is currently unavailable. Please try again in a few minutes." 
      });
    }

    console.log("ChatGPT reply:", reply);
    res.json({ reply });

  } catch (error) {
    console.error("Chat error:", error);
    res.status(500).json({ 
      error: "An error occurred while processing your request. Please try again." 
    });
  }
};

exports.testAPI = async (req, res) => {
  try {
    const testMessage = "Hello";
    const testCategory = "general";
    
    // Test main API
    const mainResult = await getChatGPTResponse(testMessage, testCategory);
    
    // Test alternative API
    const altResult = await tryAlternativeChatGPTAPI(testMessage, testCategory);
    
    res.json({
      main_api: {
        working: Boolean(mainResult),
        response: mainResult || "No response"
      },
      alternative_api: {
        working: Boolean(altResult),
        response: altResult || "No response"
      },
      api_key_configured: Boolean(RAPIDAPI_KEY)
    });
  } catch (error) {
    console.error("Test API error:", error);
    res.status(500).json({ error: "Failed to test API" });
  }
}; 