import fetch from 'node-fetch';
import fs from 'fs';
import { insertChatHistory } from '../mappers/chatHistory.js'
import { prompt } from '../config.js'

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

const fetchClaude = async (novelId, messages) => {
  try {
    const responseData = await fetchAndCheckMessage(messages);
    insertChatHistory("user", responseData.content, novelId, 0)
    return responseData;
  } catch (error) {
    console.error('Error:', error.message);
    throw error;
  }
};

async function fetchAndCheckMessage(messages) {
  const response = await fetch(config.apiUrl, {
    method: 'POST',
    headers: {
      'Authorization': config.apiKey,
      'content-type': 'application/json',
    },
    body: JSON.stringify({ messages, model: config.model, max_tokens_to_sample: config.maxToken }),
  });

  const responseData = await response.json();
  return checkMessage(responseData.choices[0].message);
}

async function checkMessage(message) {
  const checkPrompt = prompt.checkMessage + message.content;
  const checkResult = await fetchClaudeCheck([{ role: 'user', content: checkPrompt }]);
  if (checkResult.content.startsWith('是')) {
    return message;
  } else {
    const checkAgainPrompt = "'" + message.content + "'" + "这段话逻辑不太合理，不合理的地方如下请帮我修改:" + checkResult.content;
    return checkMessage(checkAgainPrompt);
  }
}



export { fetchClaude, checkMessage } ;


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
