//Simple server setup
//const http = require('http');
const app = require('./app');

const port = process.env.PORT || 3000;   //Port at which my project will run

//const server = http.createServer(app);

//server.listen(port);                    //To really start the server

app.listen(port);