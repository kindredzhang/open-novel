import ConfigLoader from './api/OpenAiConfig';
import OpenAI from './api/OpenAi';

async function main() {
    await ConfigLoader.loadConfig();
  
    const openai = new OpenAI();
    const generatedText = await openai.generateText("i am a test");
    console.log(generatedText);
  }
  
  main();