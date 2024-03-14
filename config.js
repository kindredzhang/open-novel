const database = {
  username: 'postgres',
  password: 'Kindredz155256-',
  host: '112.124.6.68',
  port: '5432',
  name: 'postgres',
};
  
const claude = {
  apiUrl: 'https://xqtd520qidong.com/v1/chat/completions',
  apiKey: 'sk-mO65CARfAnDPvzbQ65C0B2A32e9b46C49f7d0b8bB98e0467',
  model: 'claude-2.0',
  maxToken: 300,
};

const prompt = {
  firstMessage: '扩写这句话',
  checkMessage: '检查冒号分隔符后的逻辑是否合理，如果逻辑合理只需要回复我是，如果逻辑不合理只需要用指导他人的口吻告知我不合理的原因'
}

export { database, claude , prompt};
