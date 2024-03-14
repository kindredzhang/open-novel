import { client } from "../config/db.js";

async function insertChatHistory(role, content, novelId, contentType) {
    try {
      const result = await client.query(
        'INSERT INTO public.novel_chat_history(role, content, novel_id, content_type) VALUES($1, $2, $3, $4) RETURNING *',
        [role, content, novelId, contentType]
      );
  
      console.log('Inserted new chat history:', result.rows[0]);
    } catch (error) {
      console.error('Error inserting chat history:', error);
    }
}

async function queryChatHistory() {
    try {
      const result = await client.query('SELECT * FROM public.novel_chat_history');
      console.log('Query Result:', result.rows);
    } catch (error) {
      console.error('Error querying chat history:', error);
    }
}

async function queryMessagesByNovelId(novelId) {
    try {
      const result = await client.query(
        `
        SELECT
          nch."role",
          nch."content"
        FROM
          novel_chat_history nch
        LEFT JOIN
          novel ON nch.novel_id = novel.id
        LEFT JOIN
          novel_chat_history_status nchs ON nchs.message_id = nch.id
        WHERE 
          nchs.is_check_message = 0
        AND
          nchs.check_status = 1
        AND 
          nch.content_type = 0
        AND
          novel."id" = $1
        `,
        [novelId]
      );
  
      return result.rows;
    } catch (error) {
      console.error('Error querying messages54:', error);
      throw error;
    }
}

export { insertChatHistory, queryChatHistory }