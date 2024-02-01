import config from './config/config';
import app from './server';

const PORT: string | number = config.app.PORT;


const server = app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});

server.requestTimeout = 120000