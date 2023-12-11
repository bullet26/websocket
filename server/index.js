import express from 'express';
import expressWs from 'express-ws';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

export const PORT = process.env.PORT || 5001;

export const app = express();
app.use(cors());
app.use(express.json());
const { app: appWS, getWss, applyTo } = expressWs(app);

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

const broadcastMessage = msg => {
    getWss().clients.forEach(client => {
        client.send(JSON.stringify(msg));
    });
};
