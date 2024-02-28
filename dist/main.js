import { ConfigLoader } from './api/OpenAiConfig.js';
import { OpenAI } from './api/OpenAI.js';
import { History } from './api/History.js';
import { UserRole } from './models/Enum.js';
async function main() {
    await ConfigLoader.init();
    const openai = new OpenAI();
    // 拆分prompt
    const inputString = "今天的天气非常好_标识符_阳光明媚，适合外出_标识符_许多人选择去公园散步_标识符_孩子们在草地上玩耍_标识符_有人在湖边钓鱼_标识符_一些人在慢跑，享受着清新的空气_标识符_公园的花儿开得格外美丽_标识符_一对情侣在树荫下低语_标识符_远处，一位画家在画风景_标识符_这样的天气让人心情愉悦_标识符_希望每天都能这么美好。";
    const delimiter = "_标识符_";
    const parts = inputString.split(delimiter);
    const currentAgent = 111 + "write";
    for (let i = 0; i < parts.length; i++) {
        // 根据代理获取历史消息
        const history = new History();
        const currentMessage = { role: UserRole.USER, content: "帮我扩写一下下边这句话:" + parts[i] };
        await history.writeChatHistory(currentAgent, currentMessage);
        // 获取当前响应体聊天记录
        const chatHistory = await history.readChatHistory(currentAgent);
        const responseMessage = await openai.generateText(chatHistory, currentMessage);
        history.writeChatHistory(currentAgent, responseMessage);
    }
    const history = new History();
    console.log(await history.readChatHistory(currentAgent));
}
main();
