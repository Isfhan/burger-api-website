import type { Middleware, BurgerRequest, BurgerNext } from 'burger-api';

// Global middleware example: a simple logger.
export const globalLogger: Middleware = (req: BurgerRequest): BurgerNext => {
    console.log(`[Global Logger] ${req.method} ${req.url}`);
    return undefined;
};
