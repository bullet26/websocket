import { app, PORT } from './src/index.js';

const start = async () => {
    try {
        app.listen(PORT, err => {
            if (err) throw new Error(err);
            console.log(`Server WS listening on port ${PORT}`);
        });
    } catch (error) {
        console.log(error);
    }
};

start();
