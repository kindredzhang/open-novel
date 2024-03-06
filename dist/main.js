// import {ConfigLoader} from './api/OpenAiConfig.js';
// import {OpenAI} from './api/OpenAI.js';
// import { History } from './api/History.js'
// import {UserRole} from './models/Enum.js'
// import { Message} from './models/Interface.js';
// import { v4 as uuidv4 } from 'uuid';
// async function main() {
//     await ConfigLoader.init()
//     const openai = new OpenAI();
//     // 拆分prompt
//     const inputString = "今天的天气非常好_标识符_阳光明媚，适合外出_标识符_许多人选择去公园散步_标识符_孩子们在草地上玩耍_标识符_有人在湖边钓鱼_标识符_一些人在慢跑，享受着清新的空气_标识符_公园的花儿开得格外美丽_标识符_一对情侣在树荫下低语_标识符_远处，一位画家在画风景_标识符_这样的天气让人心情愉悦_标识符_希望每天都能这么美好。";
//     const delimiter = "_标识符_";
//     const parts = inputString.split(delimiter);
//     const uuid = uuidv4();
//     const currentAgent = uuid + "-" + "chat";
//     for (let i = 0; i < parts.length; i++) {
//       // 根据代理获取历史消息
//       const history = new History();
//       const currentMessage: Message = { role: UserRole.USER, content: "帮我扩写一下下边这句话:" + parts[i] }
//       await history.writeChatHistory(currentAgent, currentMessage);
//       // 获取当前响应体聊天记录
//       const chatHistory: Array<Message> = await history.readChatHistory(currentAgent);
//       const responseMessage = await openai.generateText(chatHistory, currentMessage);
//       // 写入final
//       await history.writeFinal(currentAgent, responseMessage.content + '****');
//     }
//   }
//   main();
import axios from 'axios';
async function main() {
    const inputString = "今天的天气非常好_标识符_阳光明媚，适合外出_标识符_许多人选择去公园散步_标识符_孩子们在草地上玩耍_标识符_有人在湖边钓鱼_标识符_一些人在慢跑，享受着清新的空气_标识符_公园的花儿开得格外美丽_标识符_一对情侣在树荫下低语_标识符_远处，一位画家在画风景_标识符_这样的天气让人心情愉悦_标识符_希望每天都能这么美好。";
    const parts = inputString.split('_标识符_');
    const response = await axios.post('http://localhost:3000/generateText', { parts });
    const responseMessages = response.data;
    console.log(responseMessages);
}
main();
