var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import ConfigLoader from './api/OpenAiConfig';
import { OpenAI } from './api/OpenAI';
import { History } from './api/History';
import { v4 as uuidv4 } from 'uuid';
import { UserRole } from './models/Enum';
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield ConfigLoader.loadConfig();
        const openai = new OpenAI();
        // 拆分脚本
        const inputString = "今天的天气非常好_标识符_阳光明媚，适合外出_标识符_许多人选择去公园散步_标识符_孩子们在草地上玩耍_标识符_有人在湖边钓鱼_标识符_一些人在慢跑，享受着清新的空气_标识符_公园的花儿开得格外美丽_标识符_一对情侣在树荫下低语_标识符_远处，一位画家在画风景_标识符_这样的天气让人心情愉悦_标识符_希望每天都能这么美好。 以‘_标识符_’为标识符做分割后帮我扩写每一段话";
        const delimiter = "_标识符_";
        const parts = inputString.split(delimiter);
        // 生成uuid区分文件名
        const uuid = uuidv4();
        const currentAgent = uuid + "write";
        for (let i = 0; i < parts.length; i++) {
            // 根据代理获取历史消息
            const history = new History();
            const chatHistory = yield history.readChatHistory(currentAgent);
            const currentMessage = { role: UserRole.USER, content: parts[i] };
            history.writeChatHistory(uuid, currentMessage);
            // 获取当前响应体聊天记录
            const responseMessage = yield openai.generateText(chatHistory, currentMessage);
            history.writeChatHistory(uuid, responseMessage);
        }
    });
}
main();
