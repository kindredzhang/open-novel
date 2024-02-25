import ConfigLoader from './api/OpenAiConfig';
import OpenAI from './api/OpenAi';
import History from './api/History';
import { uuid as uuidv4 } from 'uuidv4';

async function main() {
    await ConfigLoader.loadConfig();
    const openai = new OpenAI();

    // 拆分段落
    const inputString = "部分1_标识符_部分2_标识符_部分3";
    const delimiter = "_标识符_";
    const parts = inputString.split(delimiter);

    // 生成uuid区分文件名
    const currentAgent = uuidv4() + "agent1";

    const history = new History();

    for (let i = 0; i < parts.length; i++) {
      // 封装请求体聊天记录
      const messages :Messages = await history.getMessagesByAgent(currentAgent, parts[i])
      // 获取当前响应体聊天记录
      const responseMessage = await openai.generateText(currentAgent, messages);
      // todo 追加到聊天记录文件
      // messages.push(responseMessage)
      await history.writeChatHistory(currentAgent, responseMessage);

    }
  }
  
  main();