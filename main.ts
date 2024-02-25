import ConfigLoader from './api/OpenAiConfig';
import OpenAI from './api/OpenAi';
import History from './api/History';
import { uuid as uuidv4 } from 'uuidv4';
import {UserRole} from './models/Enum'

async function main() {
    await ConfigLoader.loadConfig();
    const openai = new OpenAI();

    // 拆分脚本
    const inputString = "部分1_标识符_部分2_标识符_部分3";
    const delimiter = "_标识符_";
    const parts = inputString.split(delimiter);

    // 生成uuid区分文件名
    const uuid = uuidv4();
    const currentAgent = uuid + "write";
    const history = new History();

    for (let i = 0; i < parts.length; i++) {
      // 封装请求体聊天记录
      const arrayMessage :Array<Message> = await history.getMessagesByAgent(currentAgent, parts[i])
      const messages: Messages = {messages: arrayMessage};

      // 获取当前响应体聊天记录
      const responseMessage = await openai.generateText(currentAgent, messages);
      const checkResult :Message = await openai.checkGenerateText(uuid + "check", responseMessage.content)
      if (checkResult.content.startsWith("1")) {
        // 追加到聊天记录文件
        await history.writeChatHistory(currentAgent, responseMessage);
        await history.writeFinal( responseMessage.content)
      }else{
        const message :Message = {role: UserRole.USER,content: checkResult.content}
        await openai.generateText(currentAgent, messages)
        // 追加到聊天记录文件
        await history.writeChatHistory(currentAgent, responseMessage);
        await history.writeFinal( responseMessage.content)
      }
    }
  }
  
  main();