import { client } from "../config/db.js";

async function insertChatHistoryStatus(isCheckMessage, checkStatus, messageId) {
    try {
      const result = await client.query(
        'INSERT INTO public.novel_chat_history_status(is_check_message, check_status, message_id) VALUES($1, $2, $3) RETURNING id',
        [isCheckMessage, checkStatus, messageId]
      );
  
      const insertedStatusId = result.rows[0].id;
      console.log('Inserted new chat history status with ID:', insertedStatusId);
      return insertedStatusId;
    } catch (error) {
      console.error('Error inserting chat history status:', error);
      throw error;
    }
}
  

export { insertChatHistoryStatus }