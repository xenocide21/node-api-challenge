const express = require('express');
const helmet = require('helmet');
const projectsRouter = require('./routers/projectRouter.js');
const actionsRouter = require('./routers/actionRouter.js');

const server = express();

server.use(helmet());
server.use(express.json());
server.use('/api/projects', projectsRouter)
server.use('/api/actions', actionsRouter)

server.get('/', (req, res) => { res.send(`<h2>Server is connected</h2>`) })
module.exports = server;