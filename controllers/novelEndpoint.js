import express from 'express'
import bodyParser from 'body-parser'
import { prompt } from '../config.js';

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post('/generateText', (req, res) => {
    const { novelId, promptList } = req.body;
    
    promptList.unshift(prompt);

    res.send('Data received successfully!');
});

// 启动服务器
app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
