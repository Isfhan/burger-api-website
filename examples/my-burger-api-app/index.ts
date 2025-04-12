import { Burger, setDir } from 'burger-api';
import { globalLogger } from './middleware/logger';

const burger = new Burger({
    apiDir: setDir(__dirname, 'api'),
    globalMiddleware: [globalLogger],
    version: '1.0.0',
    debug: true,
});

const port = 5000;

// Start the server on port 5000 default is 4000
burger.serve(port);
