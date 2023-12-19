import express from 'express';
import expressWs from 'express-ws';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { userDefaultPath, usersRouter } from './users/usersRouter.js';
import { errorMiddleware } from './middlewares/error.js';
import { broadcastMessage } from './utils/broadcast.js';

dotenv.config();

export const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: process.env.ClIENT_URL, credentials: true }));

export const { getWss } = expressWs(app);

app.ws('/', (ws, req) => {
    ws.on('message', message => {
        message = JSON.parse(message);
        switch (message.event) {
            case 'message':
                broadcastMessage(message);
                break;
            case 'connection':
                broadcastMessage(message);
                break;
        }
    });
});

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, ');
    next();
});

app.use(userDefaultPath, usersRouter);
app.use(errorMiddleware); // error handler middleware must be last
