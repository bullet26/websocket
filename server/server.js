import mongoose from 'mongoose';
import { app } from './src/index.js';
import { consoleInfo } from './src/utils/logger.js';

const start = async () => {
    const PORT = process.env.PORT || 5001;
    const { DB_URL } = process.env;

    try {
        await mongoose.connect(DB_URL, {});
        consoleInfo('Connected to DB');

        app.listen(PORT, err => {
            if (err) throw new Error(err);
            consoleInfo(`Server listening on port ${PORT}`);
        });
    } catch (error) {
        consoleError(error);
    }
};

start();
