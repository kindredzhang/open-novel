import fetch from 'node-fetch';

const OPENAI_API_KEY = 'sk-goMtsK28TXKRKvuT0337D0BfD4Bb4443B3657f669bAf784e'; // 替换为您的 OpenAI API 密钥

async function callOpenAIChatAPI() {
  const apiUrl = 'https://api.chatgptid.net/v1/chat/completions';

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${OPENAI_API_KEY}`,
  };

  const data = {
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: 'Say this is a test!' }],
    temperature: 0.7,
  };

  const options = {
    method: 'POST',
    headers,
    body: JSON.stringify(data),
  };

  try {
    const response = await fetch(apiUrl, options);
    const result = await response.json();
    
    // 处理 API 响应，根据需要自定义
    console.log(result);

    return result.choices[0].message.content;  // 返回生成的文本
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    throw error;
  }
}

// 调用 OpenAI Chat API
callOpenAIChatAPI();
