import express from 'express';
import expressWs from 'express-ws';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import YAML from 'yamljs';
import swaggerUi from 'swagger-ui-express';
// import config from 'config';
// import swaggerOptions from './config/swagger.options.js';
// import ExpressSwaggerGenerator from 'express-swagger-generator';
import { userDefaultPath, usersRouter } from './users/usersRouter.js';
import { errorMiddleware } from './middlewares/error.js';
//import { broadcastMessage } from './utils/broadcast.js';

dotenv.config();

const __dirname = dirname(fileURLToPath(import.meta.url));
const swaggerDocument = YAML.load(path.join(__dirname, 'docs', 'docs.yaml'));

export const app = express();

// optional display docs for Swagger version 2
// if (config.get('doc.swagger2') === true) {
//     const expressSwaggerGenerator = ExpressSwaggerGenerator(app);
//     expressSwaggerGenerator(swaggerOptions(__dirname));
// }

app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: true,
        credentials: true,
    })
);

//WEBSOCKET

// export const { getWss } = expressWs(app);

// app.ws('/', (ws, req) => {
//     ws.on('message', message => {
//         message = JSON.parse(message);
//         switch (message.event) {
//             case 'message':
//                 broadcastMessage(message);
//                 break;
//             case 'connection':
//                 broadcastMessage(message);
//                 break;
//         }
//     });
// });

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, ');
    next();
});

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(userDefaultPath, usersRouter);
app.use(errorMiddleware); // error handler middleware must be last
