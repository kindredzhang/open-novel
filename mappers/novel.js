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


export { insertNovel }