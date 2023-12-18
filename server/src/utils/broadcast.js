import { getWss } from '../index.js';

export const broadcastMessage = msg => {
    getWss().clients.forEach(client => {
        client.send(JSON.stringify(msg));
    });
};
