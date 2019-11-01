const express = require('express')
const projectsRouter = require('./projectRouter')
// const actionsRouter = require('./actionRouter')
const server = express();
const cors = require('cors')


server.use(cors())
server.use(express.json())

server.use(logger)
server.use('/api/projects', projectsRouter)
// server.use('/api/actions', actionsRouter)

server.get('/', (req, res) => {
    res.send(`
      Sprint challenge
    `);
  });

function logger(req, res, next) {
    console.log(`${req.method} to ${req.originalUrl}`)
    next();
}

module.exports = server;