import fs from 'fs';
import path from 'path';
export class Utils {
    splitString(inputString, delimiter) {
        return inputString.split(delimiter);
    }
    readFilesRecursivelySync(dir) {
        let messages = [];
        // 读取目录中的所有文件/目录
        const items = fs.readdirSync(dir, { withFileTypes: true });
        for (const item of items) {
            const fullPath = path.join(dir, item.name);
            if (item.isDirectory()) {
                // 如果是目录，则递归调用自身
                messages = messages.concat(this.readFilesRecursivelySync(fullPath));
            }
            else {
                // 读取文件内容
                const content = fs.readFileSync(fullPath, 'utf-8');
                messages.push({ role: 'user', content });
            }
        }
        return messages;
    }
}
