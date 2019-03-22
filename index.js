const express = require('express');
const cors = require('cors');

const actions = require('./data/helpers/actionRoutes.js');
const projects = require('./data/helpers/projectRoutes.js');

const server = express();

server.use(express.json());
server.use(cors());
server.use('/api/actions', actions);
server.use('/api/projects', projects);

server.listen(5000, console.log('Listening on port 5000'))