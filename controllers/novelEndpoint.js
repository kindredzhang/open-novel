import express from 'express'
import bodyParser from 'body-parser'
import { generateText } from  '../services/novelService.js'

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post('/generateText', async (req, res) => {
    const {novelId, promptList} = req.body;
    const generatedText = await generateText(novelId, promptList);
    res.send(generatedText);
});

// 启动服务器
app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
