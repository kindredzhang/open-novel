import fetch from 'node-fetch';
import fs from 'fs';

const loadConfig = () => {
  try {
    const configFile = fs.readFileSync('config.json');
    return JSON.parse(configFile);
  } catch (error) {
    console.error('Error reading config file:', error.message);
    throw error;
  }
};

const config = loadConfig();

const fetchClaude = async (messages) => {
  try {
    const response = await fetch(config.apiUrl, {
      method: 'POST',
      headers: {
        'Authorization': config.apiKey,
        'content-type': 'application/json',
      },
      body: JSON.stringify({ messages, model: config.model, max_tokens_to_sample: config.maxToken }),
    });

    const responseData = await response.json();
    
    // Adjust the return value based on the actual structure of the API response
    // This is just a placeholder example.
    return responseData.choices[0].message;
  } catch (error) {
    console.error('Error:', error.message);
    throw error; // Re-throw the error to propagate it to the calling code if needed
  }
};

// Example usage:
const exampleMessages = [
  {
    role: 'user',
    content: 'A brief introduction about yourself and say hello!',
  },
];

fetchClaude(exampleMessages)
  .then(result => {
    console.log('API Response:', result);
  })
  .catch(error => {
    console.error('Error:', error.message);
  });
