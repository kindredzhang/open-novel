import { client } from "../config/db.js";

async function insertNovel(name) {
    try {
        const result = await client.query(
            'INSERT INTO public.novel(name) VALUES($1) RETURNING *',
            [name]
        );

        console.log('Inserted new novel:', result.rows[0]);
        return result.rows[0]; // Return the inserted novel data
    } catch (error) {
        console.error('Error inserting novel:', error);
        throw error; // Re-throw the error to handle it outside
    }
}

async function getNovelById(novelId) {
    try {
        const result = await client.query(
            'SELECT * FROM public.novel WHERE id = $1',
            [id]
        );

        if (result.rows.length === 0) {
            // 如果未找到匹配的小说，则返回 null 或抛出错误
            return null;
        }

        console.log('Retrieved novel by ID:', result.rows[0]);
        return result.rows[0]; // 返回查询到的小说数据
    } catch (error) {
        console.error('Error retrieving novel by ID:', error);
        throw error; // 将错误抛出以便在调用代码中处理
    }
}

export { insertNovel, getNovelById }