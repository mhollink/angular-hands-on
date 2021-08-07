import * as express from 'express';
import * as bodyParser from  'body-parser';
import * as http from 'http';

import SocketConnector from "./app/chat/socket-connector";
import jwt from './app/jwt/jwt'
import jwtValidator from "./app/jwt/jwt-validator";
import userRouter from './app/users/user.controller'

// app constants
const app = express();
const server = http.createServer(app);
const port = process.env.port || 3333;
const socket = new SocketConnector(server);

// config
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(jwt())
app.use(jwtValidator())

// routes
app.use('/api/users', userRouter)

// initialize server on port
server
  .listen(port, () => socket.connect())
  .on('error', message => console.error(message.message));
