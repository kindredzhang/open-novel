import { OpenAI } from "../api/OpenAI.js";
import { ConfigLoader } from "../api/OpenAiConfig.js";
import { History } from "../api/History.js";
import { UserRole } from '../models/Enum.js';
import { Utils } from "../utils/Utils.js";
async function main() {
    await ConfigLoader.init();
    const openai = new OpenAI();
    const history = new History();
    const utils = new Utils();
    const messages = utils.readFilesRecursivelySync("/Users/kindredzhang/data/projects/java/guide/src/main/java/org/example/copy");
    const currentMessage = { role: UserRole.USER, content: "帮我看看当前项目中有多少个方法，回答我现在方法的总数量，每个方法的名字后加上这个方法的作用，用十个字左右简单描述即可" };
    const response = await openai.generateText(messages, currentMessage);
    await history.writeFinal("ssss", response.content + '****');
}
main();
