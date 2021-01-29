const app = require('./app');
const http = require('http');
const { PORT } = require('./utils/config');
const connectToDB = require('./db');

connectToDB();

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
