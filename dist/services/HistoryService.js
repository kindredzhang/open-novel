import sequelize from "../config/DatabaseConfig.js";
import { QueryTypes } from "sequelize";
export async function getMessagesForNovel(novelId) {
    try {
        const sql = `  
        SELECT  
          ch.role,  
          ch.content  
        FROM novel  
        LEFT JOIN chat_history ch ON novel.id = ch.novel_id  
        LEFT JOIN history_status hs ON hs.message_id = ch.id  
        WHERE novel.id = :novelId;  
      `;
        const rows = await sequelize.query(sql, {
            replacements: { novelId },
            type: QueryTypes.SELECT,
        });
        return rows;
    }
    catch (error) {
        console.error('Error fetching messages:', error);
        throw error;
    }
}
